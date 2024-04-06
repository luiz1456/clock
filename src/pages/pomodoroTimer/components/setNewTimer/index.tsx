import { FormEvent } from "react"
import { IoClose, IoCheckmark } from "react-icons/io5"
import { Container, Form } from './styles'
import Button from "../../../../components/button/Button"

export default function SetNewTimer({ setTime, timerRef, setIsPaused, setIsEditing }: any) {
  const setTimer = (event: FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const { hours, minutes, seconds } = Object.fromEntries(formData) as {
      hours: string;
      minutes: string;
      seconds: string;
    }
    let totalTimeInSeconds = (parseInt(hours) || 0) * 3600 + ((parseInt(minutes) || 0) * 60)  + (parseInt(seconds) || 0)
    if (totalTimeInSeconds > 0) {
      localStorage.setItem('newTimer', totalTimeInSeconds.toString())
      localStorage.setItem('time', totalTimeInSeconds.toString())
      setTime(totalTimeInSeconds)
      clearInterval(timerRef.current)
      setIsPaused(true)
      setIsEditing(false)
      form.reset()
    }
  }

  return (
    <Container>
      <Form onSubmit={(event) => setTimer(event)}>
        <div>
          <label htmlFor="hours">Hours:</label>
          <input id="hours" type="number" name="hours" placeholder="00" />
        </div>
        <div>
          <label htmlFor="minutes">Minutes:</label>
          <input id="minutes" type="number" name="minutes" placeholder="00" />
        </div>
        <div>
          <label htmlFor="seconds">Seconds:</label>
          <input id="seconds" type="number" name="seconds" placeholder="00" />
        </div>
        <Button type="submit"><IoCheckmark />Ok</Button>
      </Form>
      <button type="submit" className="exit" onClick={() => setIsEditing(false)} ><IoClose /></button>
    </Container>
  )
}