import 'normalize.css/normalize.css'

import './styles/index.scss'

import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { Provider } from 'mobx-react'
import { Store } from './store/index'

const store = new Store()

function Root() {
  return (
    <Provider store={store}>
      <h1>render app here</h1>
    </Provider>
  )
}

ReactDOM.render(<Root />, document.getElementById('root'))
