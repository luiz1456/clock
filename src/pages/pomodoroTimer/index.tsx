import { useRef, useState } from 'react'
import usePlaySounds from '../../hooks/usePlaySounds.ts';
import { IoPlay, IoPause, IoReload } from 'react-icons/io5'
import { BiSolidPencil } from "react-icons/bi";
import SetNewTimer from './components/setNewTimer/index.tsx'
import AlarmRinging from './components/alarmRinging.tsx/index.tsx';
import alarm from '../../assets/sounds/alarm.mp3'
import Button from '../../components/button/Button.tsx';
import { Clock, Container, ContainerButtons } from './components/style.ts';

export default function pomodoroTimer() {
  const { play, stop } = usePlaySounds({ sound: alarm, repeat: true })

  let totalTimeInSeconds = Number(localStorage.getItem('time')) || 1500
  // let totalTimeInSeconds = Number(localStorage.getItem('time')) || Number(localStorage.getItem('newTimer')) || 1500
  const [time, setTime] = useState(totalTimeInSeconds)
  localStorage.setItem('time', time.toString())

  const { hours, minutes, seconds } = {
    hours: Math.floor(time / 60 / 60),
    minutes: Math.floor(time / 60 % 60),
    seconds: time % 60
  }
  const timerRef = useRef<number>()
  const [isPaused, setIsPaused] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [alarmRinging, setAlarmRinging] = useState(false)

  const startStop = () => {
    clearInterval(timerRef.current)
    setIsPaused(!isPaused)

    timerRef.current = setInterval(() => {
      if (isPaused) {
        totalTimeInSeconds--

        if (totalTimeInSeconds >= 0) {
          setTime(totalTimeInSeconds)
        }
        if (totalTimeInSeconds === 0) {
          timeIsUp()
        }
      }
      if (isPaused === false) {
        clearInterval(timerRef.current)
      }
    }, 1000)
  }

  const timeIsUp = () => {
    setTime(Number(localStorage.getItem('newTimer')) || 1500)
    clearInterval(timerRef.current)
    setAlarmRinging(true)
    setIsEditing(false)
    setIsPaused(true)
    play()
  }

  const resetTimer = () => {
    setTime(Number(localStorage.getItem('newTimer')) || 1500)
    clearInterval(timerRef.current)
    setIsPaused(true)
    stop()
  }

  return (
    <Container>
      {isEditing && <SetNewTimer
        setTime={setTime}
        timerRef={timerRef}
        setIsPaused={setIsPaused}
        setIsEditing={setIsEditing}
      />}
      {alarmRinging &&
        <AlarmRinging setAlarmRinging={setAlarmRinging} stop={stop} />
      }
      <Clock>
        <div>
          <span>{hours.toString().padStart(2, '0')}</span>
          <span className="divider">:</span>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className="divider">:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
      </Clock>
      <ContainerButtons>
        <Button onClick={() => setIsEditing(true)} flex={true}> <BiSolidPencil /> Edit </Button>
        <Button onClick={startStop} flex={true}> {isPaused ? <IoPlay /> : <IoPause />} {isPaused ? 'Start' : 'Pause'} </Button>
        <Button onClick={resetTimer} flex={true}> <IoReload /> Reset </Button>
      </ContainerButtons>
    </Container>
  )
}
