import { inject } from 'mobx-react'
import * as React from 'react'
import { AppStore } from 'src/app/stores/AppStore'
import { Overlay } from 'src/common/components/Overlay'

type AppProps = {
  store?: AppStore
}

@inject('store')
export class App extends React.Component<AppProps> {
  render() {
    return (
      <main className="fullscreen flex-center bg-color-main text-color-main">
        {/* <Loading>hodor</Loading> */}
        <Overlay>
          <div className="bg-color-main" style={{ padding: '1rem' }}>
            ye
          </div>
        </Overlay>
      </main>
    )
  }
}
