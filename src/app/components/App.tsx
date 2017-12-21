import * as React from 'react'
import { StoreSubscriber } from '../../storeBroadcast'
import { AppStoreView } from '../stores/AppStore'
import { CharacterSelect, CharacterSelectValues } from './CharacterSelect'
import { Loading } from './Loading'
import { Login, LoginValues } from './Login'

type Props = {
  view: AppStoreView
  onLoginSubmit: (values: LoginValues) => void
  onCharacterSubmit: (values: CharacterSelectValues) => void
  onCharacterChange: (character: string) => void
}

const AppComponent = ({ view, ...props }: Props) => {
  switch (view.name) {
    case 'login':
      return <Login onSubmit={props.onLoginSubmit} statusMessage={view.statusMessage} />

    case 'characterSelect':
      return (
        <CharacterSelect
          characters={view.characters}
          initialCharacter={view.lastCharacter}
          onSubmit={props.onCharacterSubmit}
          onCharacterChange={props.onCharacterChange}
        />
      )

    case 'chat':
      return <div>chat here</div>

    case 'loading':
      return <Loading message={view.message} />
  }

  return <div>no view found</div>
}

export const App = () => (
  <StoreSubscriber>
    {stores => (
      <AppComponent
        view={stores.appStore.view}
        onLoginSubmit={values => {
          stores.appStore.handleLogin(values.username, values.password).catch(console.error)
        }}
        onCharacterSubmit={values => {
          stores.appStore.handleCharacterSubmit(values.character)
        }}
        onCharacterChange={character => {
          stores.appStore.handleCharacterChange(character).catch(console.error)
        }}
      />
    )}
  </StoreSubscriber>
)
