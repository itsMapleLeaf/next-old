import { injectGlobal } from 'react-emotion'

import { theme } from '../theme'

injectGlobal`
  * {
    box-sizing: border-box;
  }

  :root {
    font: 16px 'Roboto', sans-serif;
    font-weight: 400;
    line-height: 1.4;
    word-break: break-word;

    background-color: ${String(theme.mainColor)};
    color: ${String(theme.textColor)};
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  fieldset {
    border: none;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    padding: 0;
    margin: 0;
    font-family: 'Roboto Condensed', sans-serif;
    font-weight: 300;
  }

  h1 {
    font-size: 180%;
  }
  h2 {
    font-size: 150%;
  }
  h3 {
    font-size: 130%;
  }
  h4 {
    font-size: 100%;
  }
  h5 {
    font-size: 80%;
  }
  h6 {
    font-size: 60%;
  }

  @media screen {
    ::-webkit-scrollbar {
      width: 10px;
    }

    ::-webkit-scrollbar-thumb {
      background: ${String(theme.mainColor.lighten(0.15))};
    }

    ::-webkit-scrollbar-track {
      background: ${String(theme.mainColor.darken(0.5))};
    }
  }
`
