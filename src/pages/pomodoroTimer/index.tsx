import { useEffect, useState } from 'react'
import { useTimerControl } from './hooks/useTimerControl.ts';
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
  const [currentPeriod, setCurrentPeriod] = useState('Focus')
  const [alarmMessage, setAlarmMessage] = useState('')

  const {
    timerConfig,
    timerState,
    time,
    isFocusPeriod,
    setTime,
    setIsFocusPeriod,
    isPaused,
    start,
    stop,
    restartTimer,
  } = useTimerControl({ stopAudio })

  const { minutes, seconds } = {
    minutes: Math.floor(time / 60 % 60),
    seconds: time % 60
  }

  useEffect(() => {
    localStorage.setItem('timerState', JSON.stringify({ ...timerState, isFocusPeriod: isFocusPeriod }))
    if (isFocusPeriod) {
      setCurrentPeriod('Focus')
      setTime(time || timerConfig.focusPeriodsInSeconds)
      return
    }
    if (timerState.fullFocusPeriods === timerConfig.numberOfFocusPeriods) {
      setCurrentPeriod('Long Break')
      setTime(time || timerConfig.longPauseInSeconds)
      return
    }
    setCurrentPeriod('Short Break')
    setTime(time || timerConfig.shortBreakInSeconds)
  }, [isFocusPeriod])

  useEffect(() => {
    if (time === 0) {
      timeIsUp()
    }
    if (currentPeriod !== 'Long Break') {
      localStorage.setItem('timerState', JSON.stringify({ ...timerState, currentTime: time }))
    }
  }, [time])

  const timeIsUp = () => {
    if (isFocusPeriod && timerState.fullFocusPeriods < timerConfig.numberOfFocusPeriods) {
      timerState.fullFocusPeriods++
    }
    if (currentPeriod === 'Long Break') {
      const timerState = JSON.stringify({ currentTime: timerConfig.focusPeriodsInSeconds, fullFocusPeriods: 0, isFocusPeriod: true })
      localStorage.setItem('timerState', timerState)
    }
    setIsFocusPeriod(!isFocusPeriod)
    setAlarmRinging(true)
    setIsEditing(false)
    playAudio()
    stop()

    if (isFocusPeriod) {
      setAlarmMessage("End of focus period!")
      return
    }
    if (timerState.fullFocusPeriods === timerConfig.numberOfFocusPeriods) {
      setAlarmMessage('Full Cycle!')
      return
    }
    setAlarmMessage('End of short break!')
  }

  return (
    <Container>
      {isEditing && <SetNewTimer
        setCurrentPeriod={setCurrentPeriod}
        setIsEditing={setIsEditing}
        setTime={setTime}
        stop={stop}
      />}
      {alarmRinging &&
        <AlarmRinging
          setIsFocusPeriod={setIsFocusPeriod}
          setAlarmRinging={setAlarmRinging}
          alarmMessage={alarmMessage}
          timerConfig={timerConfig}
          stopAudio={stopAudio}
          setTime={setTime}
        />}
      <Clock>
        <div className="infoCurrentPeriod">
          <p>{currentPeriod}</p>
        </div>
        <div>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="divider">:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
        <div className='infoPeriodsCompleted'>
          <p>{timerState.fullFocusPeriods}/{timerConfig.numberOfFocusPeriods} Focus period(s) completed</p>
        </div>
      </Clock>
      <ContainerButtons>
        <Button onClick={() => setIsEditing(true)} flex={true}> <BiSolidPencil /> Edit </Button>
        {isPaused
          ? <Button onClick={start} flex={true}><IoPlay /> Start </Button>
          : <Button onClick={stop} flex={true}><IoPause />Stop </Button>
        }
        <Button onClick={restartTimer} flex={true}> <IoReload /> restart </Button>
      </ContainerButtons>
    </Container>
  )
}
