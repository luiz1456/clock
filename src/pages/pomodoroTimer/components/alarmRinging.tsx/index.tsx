import Lottie from "lottie-react";
import bellAnimation from '../../../../assets/bellAnimation/bellAnimation.json'
import pulsingAnimation from '../../../../assets/pulsingAnimation/pulsingAnimation.json'
import { ButtonStyles } from "../../../../components/button/style";
import { Container, ContainerAnimation } from "./style";
import { ContainerButtons } from "../../style";

interface Iprops {
  stopAudio: () => void,
  setAlarmRinging: React.Dispatch<React.SetStateAction<boolean>>,
  resetTimer: () => void
}

export default function AlarmRinging({ stopAudio, setAlarmRinging, resetTimer }: Iprops) {
  const stopAlarmRinging = () => {
    setAlarmRinging(false)
    stopAudio()
  }

  return (
    <Container>
      <div>
        <h1>Fim do periodo de foco!</h1>
        <ContainerAnimation>
          <Lottie className="animation" animationData={pulsingAnimation} loop={true} />
          <Lottie className="bellAnimation" animationData={bellAnimation} loop={true} />
        </ContainerAnimation>
        <ContainerButtons>
          <ButtonStyles onClick={stopAlarmRinging}>Stop</ButtonStyles>
          <ButtonStyles onClick={resetTimer}>reset</ButtonStyles>
        </ContainerButtons>
      </div>
    </Container>
  )
}