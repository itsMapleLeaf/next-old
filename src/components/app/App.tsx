import { inject } from 'mobx-react'
import * as React from 'react'

// import { Loading } from '@/components/app/Loading'
import { Overlay } from '@/components/common/Overlay'
import { Store } from '@/store'

type AppProps = {
  store?: Store
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
