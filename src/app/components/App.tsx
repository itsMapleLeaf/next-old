import * as React from 'react'
import { StoreSubscriber } from '../../storeBroadcast'
import { FadeTransition } from '../../ui/components/FadeTransition'
import { CharacterSelect } from './CharacterSelect'
import { Loading } from './Loading'
import { Login } from './Login'

export const App = () => (
  <StoreSubscriber>
    {({ appStore }) => (
      <>
        <FadeTransition active={appStore.view === 'login'}>
          <Login onSubmit={appStore.handleLoginSubmit} statusMessage={appStore.loginStatus} />
        </FadeTransition>

        <FadeTransition active={appStore.view === 'characterSelect'}>
          <CharacterSelect
            characters={appStore.characters}
            initialCharacter={appStore.lastCharacter}
            onSubmit={appStore.handleCharacterSubmit}
            onCharacterChange={appStore.handleCharacterChange}
            onBack={appStore.showLogin}
          />
        </FadeTransition>

        <FadeTransition active={appStore.view === 'chat'}>
          <div>chat here</div>
        </FadeTransition>

        <FadeTransition active={appStore.view === 'loading'}>
          <Loading message={appStore.loadingMessage} />
        </FadeTransition>
      </>
    )}
  </StoreSubscriber>
)
