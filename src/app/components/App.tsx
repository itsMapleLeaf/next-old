import * as React from 'react'
import { StoreSubscriber } from '../../storeBroadcast'
import { FadeTransition } from '../../ui/components/FadeTransition'
import { CharacterSelect } from './CharacterSelect'
import { Loading } from './Loading'
import { Login } from './Login'

export const App = () => (
  <StoreSubscriber>
    {({ appViewStore }) => (
      <>
        <FadeTransition active={appViewStore.view === 'login'}>
          <Login />
        </FadeTransition>

        <FadeTransition active={appViewStore.view === 'characterSelect'}>
          <CharacterSelect />
        </FadeTransition>

        <FadeTransition active={appViewStore.view === 'chat'}>
          <div>chat here</div>
        </FadeTransition>

        <FadeTransition active={appViewStore.view === 'loading'}>
          <Loading message={appViewStore.loadingMessage} />
        </FadeTransition>
      </>
    )}
  </StoreSubscriber>
)
