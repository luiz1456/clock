import Lottie from "lottie-react";
import bellAnimation from '../../../../assets/bellAnimation/bellAnimation.json'
import pulsingAnimation from '../../../../assets/pulsingAnimation/pulsingAnimation.json'
import { Container, ContainerAnimation } from "./style";
import { ContainerButtons } from "../../style";
import { ItimerConfig } from "../../hooks/useTimerControl";
import { ContainerModal } from "../../../../components/containerModal/style";
import Button from "../../../../components/button/Button";
import { useState } from "react";

interface Iprops {
  stopAudio: () => void,
  setAlarmRinging: React.Dispatch<React.SetStateAction<boolean>>,
  alarmMessage: string,
  timerConfig: ItimerConfig,
  setIsFocusPeriod: React.Dispatch<React.SetStateAction<boolean>>,
  setTime: React.Dispatch<React.SetStateAction<number>>
}

export default function AlarmRinging({ stopAudio, setAlarmRinging, alarmMessage, timerConfig, setIsFocusPeriod, setTime }: Iprops) {
  const [modalOpen, setModalOpen] = useState(false)
  const stopAlarmRinging = () => {
    setAlarmRinging(false)
    stopAudio()
  }

  const handleReset = () => {
    setModalOpen(!modalOpen)
  }

  const resetTimer = () => {
    const timerState = JSON.stringify({ currentTime: timerConfig.focusPeriodsInSeconds, fullFocusPeriods: 0, isFocusPeriod: true })
    localStorage.setItem('timerState', timerState)
    setTime(timerConfig.focusPeriodsInSeconds)
    setIsFocusPeriod(true)
    stopAlarmRinging()
  }

  return (
    <Container>
      <div>
        <h1>{alarmMessage}</h1>
        <ContainerAnimation>
          <Lottie className="animation" animationData={pulsingAnimation} loop={true} />
          <Lottie className="bellAnimation" animationData={bellAnimation} loop={true} />
        </ContainerAnimation>
        {modalOpen && <ContainerModal style={{ flexDirection: "column", justifyContent: "center", padding: "3.2rem" }}>
          <p style={{ fontSize: '1.4rem' }}>
            By resetting the current timer settings, you will lose the current count of full focus periods.<br />
            Is that really what you want?
          </p>
          <ContainerButtons>
            <Button flex={true} onClick={resetTimer}>Ok</Button>
            <Button flex={true} onClick={handleReset}>Cancel</Button>
          </ContainerButtons>
        </ContainerModal>}
        <ContainerButtons style={{padding:'2.4rem'}}>
          <Button onClick={stopAlarmRinging} flex={true}>{alarmMessage !== 'Full Cycle!' ? 'Next' : 'Restart Cycle'}</Button>
          {alarmMessage !== 'Full Cycle!' && <Button onClick={handleReset} flex={true}>Reset</Button>}

        </ContainerButtons>
      </div>
    </Container>
  )
}