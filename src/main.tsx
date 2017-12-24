import 'sanitize.css'

import { useStrict } from 'mobx'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import { init } from './app/actions'
import { App } from './app/components/App'
import { StoreBroadcast } from './storeBroadcast'
import { stores } from './stores'
import { applyGlobalStyles } from './ui/styles/global'

function render() {
  const root = (
    <StoreBroadcast value={stores}>
      <App />
    </StoreBroadcast>
  )

  ReactDOM.render(root, document.getElementById('root'))
  applyGlobalStyles()
}

function main() {
  useStrict(true)
  init().catch(err => console.error('Store init error:', err))
  render()

  if (process.env.NODE_ENV !== 'production') {
    if (module.hot) {
      module.hot.accept(render)
    }

    ;(window as any).stores = stores
  }
}

main()
