import { useEffect, useRef, useState } from 'react'
import usePlaySounds from '../../hooks/usePlaySounds.ts';
import useCreateTimerConfig from './hooks/useCreateTimerConfig.ts';
import { IoPlay, IoPause, IoReload } from 'react-icons/io5'
import { BiSolidPencil } from "react-icons/bi";
import SetNewTimer from './components/setNewTimer/index.tsx'
import AlarmRinging from './components/alarmRinging.tsx/index.tsx';
import Button from '../../components/button/Button.tsx';
import alarmSound from '../../assets/sounds/alarm.mp3'
import { Clock, Container, ContainerButtons } from './style.ts';

interface ItimerConfig {
  numberOfFocusPeriods: number,
  longPauseInSeconds: number,
  shortBreakInSeconds: number,
  focusPeriodsInSeconds: number
}
interface ItimerState {
  currentInterval: number,
  currentTime: number,
  isFocusPeriod: boolean
}

export default function pomodoroTimer() {

  if (!localStorage.getItem("timerConfig")) {
    useCreateTimerConfig({})
  }
  const timerConfig: ItimerConfig = JSON.parse(localStorage.getItem('timerConfig') as string)
  const timerState: ItimerState = JSON.parse(localStorage.getItem('timerState') as string)
  const { playAudio, stopAudio } = usePlaySounds({ sound: alarmSound, repeat: true })
  const [time, setTime] = useState<number>(timerState.currentTime)
  const { minutes, seconds } = {
    minutes: Math.floor(time / 60 % 60),
    seconds: time % 60
  }
  const timerRef = useRef<number>()
  const [isPaused, setIsPaused] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [alarmRinging, setAlarmRinging] = useState(false)
  const [isFocusPeriod, setIsFocusPeriod] = useState(timerState.isFocusPeriod)

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

  const stop = () => {
    clearInterval(timerRef.current)
    setIsPaused(true)
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

  const resetTimer = () => {
    stopAudio()
    stop()
    if (isFocusPeriod) {
      setTime(timerConfig.focusPeriodsInSeconds)
      return
    } 
    setTime(timerConfig.shortBreakInSeconds)    
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
          setAlarmRinging={setAlarmRinging}
          stopAudio={stopAudio} />
      }
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
