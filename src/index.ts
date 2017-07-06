import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import Store from './store'
import './styles.css'

const store = new Store()

function render() {
  const Root = require('./components/App').default as typeof App
  ReactDOM.render(React.createElement(Root, { store }), document.getElementById('root'))
}

render()

declare var module: any
if (module.hot) module.hot.accept('./components/App', render)
