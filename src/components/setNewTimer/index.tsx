import { FormEvent } from "react"
import { IoClose, IoCheckmark } from "react-icons/io5"
import styles from './setNewTimer.module.css'

export default function SetNewTimer({ setTime, timerRef, setIsPaused, setIsEditing }: any) {
  const setTimer = (event: FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)
    const hours = parseInt(data.hours as string) || 0
    const minutes = parseInt(data.minutes as string) || 0
    const seconds = parseInt(data.seconds as string) || 0
    const totalTimeInSeconds = (hours * 60 * 60) + (minutes * 60) + seconds

    if (totalTimeInSeconds > 0) {
      localStorage.setItem('time', totalTimeInSeconds.toString())
      setTime(totalTimeInSeconds)
      clearInterval(timerRef.current)
      setIsPaused(true)
      setIsEditing(false)
      form.reset()
    }
  }

  return (
    <div className={styles.containerForm}>
      <form onSubmit={(event) => setTimer(event)} className={styles.form}>
        <div>
          <label htmlFor="hours">Hours:</label>
          <input id="hours" type="number" name="hours" placeholder="00" />
        </div>
        <div>
          <label htmlFor="minutes">Minutes:</label>
          <input id="minutes" type="number" name="minutes" placeholder="00"/>
        </div>
        <div>
          <label htmlFor="seconds">Seconds:</label>
          <input id="seconds" type="number" name="seconds" placeholder="00"/>
        </div>
        <button type="submit"><IoCheckmark />Ok</button>
      </form>
        <button type="submit" className={styles.exit} onClick={() => setIsEditing(false)} ><IoClose /></button>
    </div>
  )
}