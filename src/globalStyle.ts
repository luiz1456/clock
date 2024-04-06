import {createGlobalStyle} from 'styled-components'

export const GlobalStyle = createGlobalStyle`
body {
  background-color: #000;
  color: #fff;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

#root, html {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

:root {
  font-size: 62.5%; /* 10px */
}
`