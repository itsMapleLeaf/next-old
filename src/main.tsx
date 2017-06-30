import 'normalize.css/normalize.css'
import './styles.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'

function render() {
  ReactDOM.render(<App />, document.getElementById('app'))
}

render()

declare var module: any
if (module.hot) {
  module.hot.accept('./components/App', render)
}
