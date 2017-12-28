import { injectGlobal } from 'emotion'

import * as colors from './colors'

export function applyGlobalStyles() {
  injectGlobal`

    :root {
      font-size: 16px;
      font-family: Roboto, sans-serif;
      color: ${colors.clouds};
      background-color: ${colors.flist5};
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Roboto Condensed', sans-serif;
      font-weight: 300;
      margin: 0;
      padding: 0;
    }

    a {
      text-decoration: none;
      color: inherit;
    }

    fieldset {
      border: none;
    }
  `
}
