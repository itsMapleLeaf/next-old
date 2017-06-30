import 'normalize.css/normalize.css'
import './styles.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { AppContainer } from 'react-hot-loader'
import App from './components/App'

function render() {
  ReactDOM.render(
    <AppContainer>
      <App />
    </AppContainer>,
    document.getElementById('app')
  )
}

render()

declare var module: any
if (module.hot) {
  module.hot.accept('./components/App', render)
}
