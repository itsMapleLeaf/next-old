import 'normalize.css/normalize.css'

import './styles/colors.scss'
import './styles/fade-transition.scss'
import './styles/flex.scss'
import './styles/global.scss'
import './styles/helpers.scss'
import './styles/bbc.scss'
import './styles/character-colors.scss'

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
