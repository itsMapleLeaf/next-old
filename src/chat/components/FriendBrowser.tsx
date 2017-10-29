import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { getAvatarURL } from 'src/api'
import { CharacterName } from 'src/character/components/CharacterName'
import { Stores } from 'src/stores'
import styled from 'styled-components'

const Wrapper = styled.div`
  width: 400px;
  height: 600px;

  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
`

type InjectedProps = {
  onlineFriends: string[]
  offlineFriends: string[]
}

function storesToProps(stores: Stores): InjectedProps {
  const allFriends = Object.keys(stores.chatStore.friends)

  // TODO: make this DRYer(?)
  const onlineFriends = allFriends.filter(name => {
    const char = stores.characterStore.getCharacter(name)
    return char.status !== 'offline'
  })

  const offlineFriends = allFriends.filter(name => {
    const char = stores.characterStore.getCharacter(name)
    return char.status === 'offline'
  })

  return { onlineFriends, offlineFriends }
}

@inject(storesToProps)
@observer
class FriendBrowserComponent extends React.Component<InjectedProps> {
  render() {
    return (
      <Wrapper className="bg-color-main padding spaced-children-v scroll-v">
        <h2>Online</h2>
        {this.props.onlineFriends.map(this.renderEntry)}

        <h2>Offline</h2>
        {this.props.offlineFriends.map(this.renderEntry)}
      </Wrapper>
    )
  }

  renderEntry = (name: string) => (
    <div className="bg-color-darken-1 padding flex-row flex-align-center spaced-children-h">
      <img src={getAvatarURL(name)} style={{ width: '24px', height: '24px' }} />
      <CharacterName name={name} />
    </div>
  )
}

export const FriendBrowser = FriendBrowserComponent as React.ComponentClass<{}>
