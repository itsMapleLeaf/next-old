import { injectGlobal } from 'emotion'
import * as theme from './theme'

export function applyGlobalStyles() {
  injectGlobal`
    :root {
      font-size: 16pt;
      font-family: Roboto, sans-serif;
      ${theme.secondary};
    }

    h1, h2, h3, h4, h5, h6 {
      font-family: 'Roboto Condensed', sans-serif;
      font-weight: 300;
    }
  `
}
