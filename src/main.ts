import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './components/App'
import './styles/main.styl'

function render() {
  ReactDOM.render(React.createElement(App), document.getElementById('app'))
}

render()

declare const module: NodeModule & { hot: any }
if (module.hot) {
  module.hot.accept(render)
}
