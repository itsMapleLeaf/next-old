import 'sanitize.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './App'
import { applyGlobalStyles } from './ui/styles/global'

function render() {
  applyGlobalStyles()
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()
if (module.hot) {
  module.hot.accept(render)
}
