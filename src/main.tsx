import "./index.scss"

import { useStrict } from "mobx"
import { Provider } from "mobx-react"
import DevTools from "mobx-react-devtools"
import * as React from "react"
import * as ReactDOM from "react-dom"
import { App } from "./app/components/App"
import { stores } from "./stores"

useStrict(true)

const devmode = process.env.NODE_ENV !== "production"

function Root() {
  return (
    <div>
      <Provider {...stores}>
        <App />
      </Provider>
      {devmode && <DevTools position={{ right: 0, bottom: 0 }} />}
    </div>
  )
}

function render() {
  ReactDOM.render(<Root />, document.getElementById("root"))
}

render()
stores.appStore.init().catch(console.error)

if (devmode) {
  if (module.hot) {
    module.hot.accept("./app/components/App", render)
  }

  ;(window as any).stores = stores
}
