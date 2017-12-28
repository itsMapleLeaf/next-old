import * as React from 'react'

import { Chat } from '../../chat/components/Chat'
import { StoreConsumer } from '../../storeContext'
import { FadeTransition } from '../../ui/components/FadeTransition'
import { CharacterSelect } from './CharacterSelect'
import { Loading } from './Loading'
import { Login } from './Login'

export const App = () => (
  <StoreConsumer>
    {({ appViewStore }) => (
      <>
        <FadeTransition active={appViewStore.view === 'login'}>
          <Login />
        </FadeTransition>

        <FadeTransition active={appViewStore.view === 'characterSelect'}>
          <CharacterSelect />
        </FadeTransition>

        <FadeTransition active={appViewStore.view === 'chat'}>
          <Chat />
        </FadeTransition>

        <FadeTransition active={appViewStore.view === 'loading'}>
          <Loading message={appViewStore.loadingMessage} />
        </FadeTransition>
      </>
    )}
  </StoreConsumer>
)
