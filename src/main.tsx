import 'sanitize.css'

import { useStrict } from 'mobx'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { testInit } from './app/actions'
import { App } from './app/components/App'
import { StoreProvider } from './storeContext'
import { stores } from './stores'
import { applyGlobalStyles } from './ui/styles/global'

function render() {
  const root = (
    <StoreProvider value={stores}>
      <App />
    </StoreProvider>
  )

  ReactDOM.render(root, document.getElementById('root'))
  applyGlobalStyles()
}

function main() {
  useStrict(true)
  // init().catch(err => console.error('Store init error:', err))
  testInit()
  render()

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept('./app/components/App', render)
    }

    ;(window as any).stores = stores
  }
}

main()
