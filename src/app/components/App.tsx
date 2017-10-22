import { inject } from 'mobx-react'
import * as React from 'react'
import { Loading } from 'src/app/components/Loading'
import { AppStore } from 'src/app/stores/AppStore'

type AppProps = {
  store?: AppStore
}

@inject('store')
export class App extends React.Component<AppProps> {
  render() {
    return (
      <main className="fullscreen flex-center bg-color-main text-color-main">
        <Loading text="hodor" />
      </main>
    )
  }
}
