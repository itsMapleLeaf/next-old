import 'normalize.css/normalize.css'
import './index.scss'

import { Provider } from 'mobx-react'
import DevTools from 'mobx-react-devtools'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app/components/App'
import { stores } from './stores'

function Root() {
  return (
    <div>
      <Provider {...stores}>
        <App />
      </Provider>
      <DevTools position={{ right: 0, bottom: 0 }} />
    </div>
  )
}

function render() {
  ReactDOM.render(<Root />, document.getElementById('root'))
}

render()
stores.appStore.init().catch(console.error)

if (process.env.NODE_ENV !== 'production') {
  if (module.hot) {
    module.hot.accept('./app/components/App', render)
  }

  ;(window as any).stores = stores
}
