import { useEffect, useState } from 'react'
import useTimerControl from './hooks/useTimerControl.ts';
import AlarmRinging from './components/alarmRinging.tsx/index.tsx';
import SetNewTimer from './components/setNewTimer/index.tsx'
import Button from '../../components/button/Button.tsx';
import { Clock, Container, ContainerButtons } from './style.ts';
import { IoPlay, IoPause, IoReload } from 'react-icons/io5'
import { BiSolidPencil } from "react-icons/bi";
import usePlaySounds from '../../hooks/usePlaySounds.ts';
import alarmSound from '../../assets/sounds/alarm.mp3'

export default function pomodoroTimer() {
  const { playAudio, stopAudio } = usePlaySounds({ sound: alarmSound, repeat: true })
  const [alarmRinging, setAlarmRinging] = useState(false)
  const [isEditing, setIsEditing] = useState(false)

  const {
    timerConfig,
    timerState,
    time,
    isFocusPeriod,
    setTime,
    setIsFocusPeriod,
    isPaused,
    stop,
    resetTimer,
    setIsPaused,
    timerRef
  } = useTimerControl({stopAudio})

  const { minutes, seconds } = {
    minutes: Math.floor(time / 60 % 60),
    seconds: time % 60
  }

  useEffect(() => {
    localStorage.setItem('timerState', JSON.stringify({ ...timerState, isFocusPeriod: isFocusPeriod }))
    if (isFocusPeriod) {
      setTime(time || timerConfig.focusPeriodsInSeconds)
      return
    }
    if (timerState.currentInterval === timerConfig.numberOfFocusPeriods) {
      setTime(time || timerConfig.longPauseInSeconds)
      return
    }
    setTime(time || timerConfig.shortBreakInSeconds)
  }, [isFocusPeriod])

  useEffect(() => {
    if (time === 0) {
      timeIsUp()
    }
    localStorage.setItem('timerState', JSON.stringify({ ...timerState, currentTime: time }))
  }, [time])

  const start = () => {
    setIsPaused(false)
    timerRef.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
  }

  const timeIsUp = () => {
    if (isFocusPeriod && timerState.currentInterval < timerConfig.numberOfFocusPeriods) {
      timerState.currentInterval++
    }
    setIsFocusPeriod(!isFocusPeriod)
    setAlarmRinging(true)
    setIsEditing(false)
    playAudio()
    stop()
  }

  return (
    <Container>
      {isEditing && <SetNewTimer
        setIsEditing={setIsEditing}
        setTime={setTime}
        stop={stop}
      />}
      {alarmRinging &&
        <AlarmRinging
          stopAudio={stopAudio}
          setAlarmRinging={setAlarmRinging}
          resetTimer={resetTimer}
        />}
      <Clock>
        <div>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="divider">:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
      </Clock>
      <ContainerButtons>
        <Button onClick={() => setIsEditing(true)} flex={true}> <BiSolidPencil /> Edit </Button>
        {isPaused
          ? <Button onClick={start} flex={true}><IoPlay /> Start </Button>
          : <Button onClick={stop} flex={true}><IoPause />Stop </Button>
        }
        <Button onClick={resetTimer} flex={true}> <IoReload /> Reset </Button>
      </ContainerButtons>
    </Container>
  )
}
