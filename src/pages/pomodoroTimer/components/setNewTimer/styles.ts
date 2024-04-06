import styled from "styled-components"
import { ContainerModal } from "../../../../components/containerModal/style"

export const Container = styled(ContainerModal)`
  .exit {
    position: absolute;
    top: 1.2rem;
    right: 1.2rem;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0.4rem;
    font-size: 2.4rem;
    background-color: #3f3f3f;
    border: none;
    color: #ffffff;
  }

`

export const Form = styled.form`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  flex-direction: column;
  padding: 2.4rem;
  width: 100%;
  height: 80%;

  div {
    display: flex;
    gap: 2.4rem;
    align-items: baseline;
    justify-content: center;
    width: 100%;

    label {
      width: 6.8rem;
      font-size: 1.4rem;
    }

    input {
      border-radius: 0.4rem;
      border: 0.1rem solid #3f3f3f;
      background-color: #3f3f3f;
      padding: 0.4rem;
      color: #ffffff;
      flex: 1;
      max-width: 70%;
      height: 3.6rem;

      &:focus {
        border: 0.1rem solid #ddd;
        outline: 0;
      }

      &::-webkit-inner-spin-button {
        -webkit-appearance: none;
      }
    }
  }
`
