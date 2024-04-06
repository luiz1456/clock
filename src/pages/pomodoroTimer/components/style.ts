import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  position: relative;
  padding: 3.2rem;
  height: 40.0rem;
`

export const Clock = styled.div`
  display: flex;
  justify-content: center;

  span {
    font-family: "Orbitron", sans-serif;
    font-weight: 600;
    font-size: 8.0rem;
    padding: 0 0.4rem;
    color: #FF9500;
    display: inline-block;
    min-width: 14.2rem;
  }

  span:nth-last-child(1) {
    font-size: 6.4rem;
    min-width: 11.5rem;
  }

  .divider {
    min-width: max-content;
  }
`

export const ContainerButtons = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.8rem;
  margin-top: 4.0rem;
  width: 100%;
`

