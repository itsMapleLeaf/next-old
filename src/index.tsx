import './styles/base.css'
import './styles/flex.css'
import './styles/helpers.css'
import './styles/inputs.css'
import './styles/scrollbar.css'
import './styles/theme.css'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import Store from './store'

declare var require: (module: string) => any
declare var module: any

const store = new Store()

function render() {
  const Root = require('./components/App').default as typeof App
  ReactDOM.render(<Root store={store} />, document.getElementById('root'))
}

render()
if (module.hot) module.hot.accept('./components/App', render)
