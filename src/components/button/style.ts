import styled from 'styled-components'

export const ButtonStyles = styled.button<{$flex?: boolean}>`
  border: 0.1rem solid #2d2d2d;
  border-radius: 0.8rem;
  background-color: #1d1d1d;
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2.0rem;
  gap: 0.4rem;
  font-family: "Poppins", sans-serif;
  padding: 0.4rem 0.8rem;
  flex: ${({$flex}) => $flex ? 1 : 0 };
  
  &:hover {
    border: 0.1rem solid #ff9500;
  }
`