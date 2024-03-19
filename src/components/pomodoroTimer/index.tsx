import { useRef, useState } from 'react'
import styles from './pomodoroTimer.module.css'
// import { useNavigate } from 'react-router-dom'
import { IoPlay, IoPause, IoReload } from 'react-icons/io5'
import { BiSolidPencil } from "react-icons/bi";
import SetNewTimer from '../setNewTimer'

export default function pomodoroTimer() {
  let totalTimeInSeconds = Number(localStorage.getItem('time')) || 1500
  const [time, setTime] = useState(totalTimeInSeconds)
  localStorage.setItem('time', time.toString())
  const hours = Math.floor(time / 60 / 60)
  const minutes = Math.floor(time / 60 % 60)
  const seconds = time % 60
  const timerRef = useRef<number>()
  const [isPaused, setIsPaused] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  // const navigate = useNavigate();

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
          clearInterval(timerRef.current)
          console.log('Fim do tempo!')
          setIsPaused(true)
        }
      }
      if (isPaused === false) {
        clearInterval(timerRef.current)
      }
      console.log('tick')
    }, 1000)
  }

  const resetTimer = () => {
    setTime(120)
    setIsPaused(true)
    clearInterval(timerRef.current)
  }

  // const toTimer = () => {
  //   clearInterval(timerRef.current)
  //   return navigate("cronometro")
  // }

  return (
    <div className={styles.container}>
      {isEditing && <SetNewTimer
        setTime={setTime}
        timerRef={timerRef}
        setIsPaused={setIsPaused}
        setIsEditing={setIsEditing}
      />}
      <div className={styles.clock}>
        <div>
          <span>{hours.toString().padStart(2, '0')}</span>
          <span className={styles.divider}>:</span>
          <span>{minutes.toString().padStart(2, '0')}</span>
          <span className={styles.divider}>:</span>
          <span>{seconds.toString().padStart(2, '0')}</span>
        </div>
      </div>
      <div className={styles.containerButtons}>
        <button onClick={() => setIsEditing(true)}> <BiSolidPencil /> edit </button>
        <button onClick={startStop}> {isPaused ? <IoPlay /> : <IoPause />} {isPaused ? 'Play' : 'Pause'} </button>
        <button onClick={resetTimer}> <IoReload /> Reset </button>
        {/* <button onClick={toTimer}>Timer</button> */}
      </div>
    </div>
  )
}
