import styled from "styled-components";
import { ContainerModal } from "../../../../components/containerModal/style";

export const Container = styled(ContainerModal)`
  &>div {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    width: 100%;
    height: 100%;
  }
`


export const ContainerAnimation = styled.div`
  height: 50%;
  margin: 1.2rem;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  
  .animation {
    width: 100%;
    height: 100%;
  }

  .bellAnimation {
    position: absolute;
    width: 55%;
    height: 55%;
  }

  h1 {
    position: absolute;
    width: 50%;
    font-family: "Poppins";
  }
`
