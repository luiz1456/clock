import styled from "styled-components";
import { ContainerModal } from "../../../../components/containerModal/style";

export const Container = styled(ContainerModal)`
  &>div {
    
  h1 {
    font-family: "Poppins";
    font-size: 2.4rem;
    font-style: italic;
    font-weight: 500;
  }
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
`
