import 'normalize.css/normalize.css'
import './styles/index.scss'

import { Provider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './components/app/App'
import { Store } from './store/index'

const store = new Store()

function Root() {
  return (
    <Provider store={store}>
      <App />
    </Provider>
  )
}

function render() {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

render()
if (module.hot) module.hot.accept(render)
