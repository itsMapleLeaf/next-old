import 'normalize.css/normalize.css'
import './index.scss'

import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app/components/App'
import { AppStore } from './app/stores/AppStore'

const store = new AppStore()

function Root() {
  return (
    <div>
      <Provider store={store}>
        <App />
      </Provider>
      <DevTools />
    </div>
  )
}

function render() {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

render()
store.init()

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./app/components/App', render)
  }

  ;(window as any).store = store
}
