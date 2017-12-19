import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { getProfileURL } from 'src/api'
import { Icon } from 'src/app/components/Icon'
import { CharacterDetails } from 'src/character/components/CharacterDetails'
import { ignore, unignore } from 'src/chat/actions'
import { preventDefault } from 'src/common/util/react'
import { Stores } from 'src/stores'

const MenuContainer = styled.div`
  width: 200px;
  box-shadow: 0px 0px 8px black;
`

const MenuAction = styled.a`
  opacity: 0.5;

  &:hover {
    opacity: 1;
  }
`

type Props = {
  character: string
}

type InjectedProps = {
  ignored: boolean
  onSendMessageAction: (character: string) => void
  onIgnoreAction: (character: string) => void
}

function CharacterMenuContentComponent(props: Props & InjectedProps) {
  const { character } = props
  const profileURL = getProfileURL(character)

  const handleSendMessage = preventDefault(() => props.onSendMessageAction(character))
  const handleIgnore = preventDefault(() => props.onIgnoreAction(character))

  return (
    <MenuContainer className="bg-color-darken-1 flex-column">
      <div className="bg-color-main">
        <CharacterDetails name={character} />
      </div>

      <MenuAction className="padding" href="#" onClick={handleSendMessage}>
        <Icon name="message" /> Send Message
      </MenuAction>

      <MenuAction className="padding" href={profileURL} target="_blank">
        <Icon name="link" /> Open Profile
      </MenuAction>

      <MenuAction className="padding" href="#" onClick={handleIgnore}>
        <Icon name={props.ignored ? 'remove-circle' : 'remove-circle-outline'} />{' '}
        {props.ignored ? 'Unignore' : 'Ignore'}
      </MenuAction>
    </MenuContainer>
  )
}

function storesToProps(stores: Stores, props: Props): InjectedProps {
  const ignored = stores.chatStore.isIgnored(props.character)

  return {
    ignored,

    onSendMessageAction() {
      stores.privateChatStore.openPrivateChat(props.character)
    },

    onIgnoreAction() {
      if (ignored) {
        unignore(props.character)
      } else {
        ignore(props.character)
      }
    },
  }
}

export const CharacterMenuContent = inject(storesToProps)(
  observer(CharacterMenuContentComponent),
) as React.StatelessComponent<Props>
