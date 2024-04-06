import Lottie from "lottie-react";
import animation from '../../../../assets/animation/animation.json'
import { ButtonStyles } from "../../../../components/button/style";
import { Container } from "./style";

export default function AlarmRinging({ stop, setAlarmRinging }: any) {
  const stopAlarmRinging = () => {
    stop()
    setAlarmRinging(false)
  }

  return (
    <Container>
      <Lottie className="animation" animationData={animation} loop={true}/>
      <ButtonStyles onClick={stopAlarmRinging}>Stop</ButtonStyles>
    </Container>
  )
}