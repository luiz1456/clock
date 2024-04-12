import { FormEvent } from "react"
import { IoClose, IoCheckmark } from "react-icons/io5"
import { Container, Form } from './styles'
import Button from "../../../../components/button/Button"
import useCreateTimerConfig from "../../hooks/useCreateTimerConfig"

interface Iprops {
  setIsEditing: React.Dispatch<React.SetStateAction<boolean>>,
  setTime: React.Dispatch<React.SetStateAction<number>>,
  stop: () => void
}

export default function SetNewTimer({ setIsEditing, setTime, stop  }: Iprops) {

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault()
    const form = event.currentTarget as HTMLFormElement
    const formData = new FormData(form)
    const formValues = Object.fromEntries(formData)

    const acceptedForm = () => {
      for (const key in formValues) {
        if (parseInt(formValues[key] as string) <= 0) {
          return false;
        }
      }
      return true
    }

    if (acceptedForm()) {
      const { timerConfig } = useCreateTimerConfig(formValues)
      setTime(timerConfig.focusPeriodsInSeconds)
      setIsEditing(false)
      form.reset()
      stop()
    }
  }

  return (
    <Container>
      <Form onSubmit={(event) => handleSubmit(event)}>
        <div>
          <label htmlFor="focusPeriodSize">Focus period size:</label>
          <input id="focusPeriodSize" type="number" name="focusPeriodSize" placeholder="In minutes" required />
        </div>
        <div>
          <label htmlFor="shortBreak">Short break:</label>
          <input id="shortBreak" type="number" name="shortBreak" placeholder="In minutes" required />
        </div>
        <div>
          <label htmlFor="longPause">Long pause:</label>
          <input id="longPause" type="number" name="longPause" placeholder="In minutes" required />
        </div>
        <div>
          <label htmlFor="focusPeriods">Focus periods:</label>
          <input id="focusPeriods" type="number" name="focusPeriods" placeholder="4" required />
        </div>
        <Button type="submit"><IoCheckmark />Ok</Button>
      </Form>
      <button type="submit" className="exit" onClick={() => setIsEditing(false)} ><IoClose /></button>
    </Container>
  )
}