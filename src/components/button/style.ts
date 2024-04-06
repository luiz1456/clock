import styled from 'styled-components'

export const ButtonStyles = styled.button<{Flex?: boolean | null}>`
  border: 0.1rem solid #2d2d2d;
  border-radius: 0.8rem;
  background-color: #2d2d2d;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.4rem;
  gap: 0.4rem;
  font-family: "Poppins", sans-serif;
  padding: 0.8rem;
  flex: ${({Flex}) => Flex ? 1 : 0 };
  
  &:hover {
    border: 0.1rem solid #ff9500;
  }
`