import sortBy from 'lodash/sortBy'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { getAvatarURL } from 'src/api'
import { CharacterName } from 'src/character/components/CharacterName'
import { Stores } from 'src/stores'

const Wrapper = styled('div')`
  width: 400px;
  height: 600px;

  max-width: calc(100vw - 40px);
  max-height: calc(100vh - 40px);
`

type InjectedProps = {
  onlineFriends: string[]
  offlineFriends: string[]
  ignoredUsers: string[]
}

function storesToProps(stores: Stores): InjectedProps {
  const allFriends = sortBy(Object.keys(stores.chatStore.friends))

  // TODO: make this DRYer(?)
  const onlineFriends = allFriends.filter(name => {
    const char = stores.characterStore.getCharacter(name)
    return char.status !== 'offline'
  })

  const offlineFriends = allFriends.filter(name => {
    const char = stores.characterStore.getCharacter(name)
    return char.status === 'offline'
  })

  const ignoredUsers = Array.from(stores.chatStore.ignored.keys())

  return { onlineFriends, offlineFriends, ignoredUsers }
}

@inject(storesToProps)
@observer
class FriendBrowserComponent extends React.Component<InjectedProps> {
  render() {
    const { onlineFriends, offlineFriends, ignoredUsers } = this.props
    return (
      <Wrapper className="bg-color-main padding spaced-children-v scroll-v">
        <h2>Friends / Bookmarks</h2>
        {this.renderUserList(onlineFriends)}

        <h2>Offline</h2>
        {this.renderUserList(offlineFriends)}

        <h2>Ignored</h2>
        {this.renderUserList(ignoredUsers)}
      </Wrapper>
    )
  }

  private renderUserList(users: string[]) {
    if (users.length > 0) {
      return users.map(this.renderEntry)
    }
    return <div className="padding text-small text-italic faded">No users found.</div>
  }

  private renderEntry = (name: string) => (
    <div
      key={name}
      className="bg-color-darken-1 padding flex-row flex-align-center spaced-children-h"
    >
      <img src={getAvatarURL(name)} style={{ width: '24px', height: '24px' }} />
      <CharacterName name={name} />
    </div>
  )
}

export const FriendBrowser = FriendBrowserComponent as React.ComponentClass<{}>
