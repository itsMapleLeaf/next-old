import 'sanitize.css'

import { useStrict } from 'mobx'
import { Provider as StoreProvider } from 'mobx-react'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { App } from './app/components/App'
import { stores } from './stores'
import { applyGlobalStyles } from './ui/styles/global'

function render() {
  const root = (
    <StoreProvider {...stores}>
      <App />
    </StoreProvider>
  )

  ReactDOM.render(root, document.getElementById('root'))
  applyGlobalStyles()
}

function main() {
  useStrict(true)
  stores.appStore.init().catch(err => console.error('Store init error:', err))
  render()

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept(render)
    }

    ;(window as any).stores = stores
  }
}

main()
