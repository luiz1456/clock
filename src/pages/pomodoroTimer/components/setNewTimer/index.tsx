import { FormEvent } from "react"
import { IoClose, IoCheckmark } from "react-icons/io5"
import { Container, Form } from './styles'
import Button from "../../../../components/button/Button"
import useCreateTimerConfig from "../../hooks/useCreateTimerConfig"

interface Iprops {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  setCurrentPeriod: React.Dispatch<React.SetStateAction<string>>,
  stop: () => void
}


export default function SetNewTimer({ setIsEditing, setTime, stop, setCurrentPeriod }: Iprops) {

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const { timerConfig } = useCreateTimerConfig(Object.fromEntries(formData))
    setTime(timerConfig.focusPeriodsInSeconds)
    setCurrentPeriod('Focus')
    setIsEditing(false)
    form.reset()
    stop()
  }

  return (
    <Container>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label htmlFor="focusPeriodSize">Focus period size:</label>
          <input id="focusPeriodSize" type="number" name="focusPeriodSize" placeholder="In minutes" required max={60} min={1} />
        </div>
        <div>
          <label htmlFor="shortBreak">Short break:</label>
          <input id="shortBreak" type="number" name="shortBreak" placeholder="In minutes" required  max={60} min={1} />
        </div>
        <div>
          <label htmlFor="longPause">Long pause:</label>
          <input id="longPause" type="number" name="longPause" placeholder="In minutes" required  max={60} min={1} />
        </div>
        <div>
          <label htmlFor="focusPeriods">Focus periods:</label>
          <input id="focusPeriods" type="number" name="focusPeriods" placeholder="4" required min={1} />
        </div>
        <Button type="submit"><IoCheckmark />Ok</Button>
      </Form>
      <button type="submit" className="exit" onClick={() => setIsEditing(false)} ><IoClose /></button>
    </Container>
  )
}