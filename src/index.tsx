import 'normalize.css/normalize.css'
import './styles.css'

import DevTools from 'mobx-react-devtools'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import AppStore from './app-store'
import App from './components/App'

const store = new AppStore()
store.init()

function render() {
  const Root = require('./components/App').default as typeof App
  ReactDOM.render(
    <div>
      <Root store={store} />
      <DevTools />
    </div>,
    document.getElementById('root')
  )
}

declare var module: any
if (module.hot) {
  module.hot.accept('./components/App', render)
}

render()
