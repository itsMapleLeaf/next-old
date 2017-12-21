import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { Injector } from '../../stores'
import { AppStoreView } from '../stores/AppStore'
import { CharacterSelect, CharacterSelectValues } from './CharacterSelect'
import { Loading } from './Loading'
import { Login, LoginValues } from './Login'

const noop = () => {}

type Props = {
  view?: AppStoreView
  onLoginSubmit?: (values: LoginValues) => void
  onCharacterSubmit?: (values: CharacterSelectValues) => void
  onCharacterChange?: (character: string) => void
}

const AppComponent = (props: Props) => {
  const { view } = props

  if (!view) {
    return <div>no view found</div>
  }

  switch (view.name) {
    case 'login':
      return <Login onSubmit={props.onLoginSubmit || noop} statusMessage={view.statusMessage} />

    case 'characterSelect':
      return (
        <CharacterSelect
          characters={view.characters}
          initialCharacter={view.lastCharacter}
          onSubmit={props.onCharacterSubmit || noop}
          onCharacterChange={props.onCharacterChange || noop}
        />
      )

    case 'chat':
      return <div>chat here</div>

    case 'loading':
      return <Loading message={view.message} />
  }

  return <div>no view found</div>
}

const storesToProps: Injector<Props> = stores => ({
  view: stores.appStore.view,
  onLoginSubmit: values => {
    stores.appStore.handleLogin(values.username, values.password)
  },
  onCharacterSubmit: values => {
    stores.appStore.handleCharacterSubmit(values.character)
  },
  onCharacterChange: character => {
    stores.appStore.handleCharacterChange(character)
  },
})

export const App = inject(storesToProps)(observer(AppComponent))
