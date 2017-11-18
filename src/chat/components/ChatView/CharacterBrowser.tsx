import { sortBy } from 'lodash'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { getAvatarURL } from 'src/api'
import { CharacterName } from 'src/character/components/CharacterName'
import { Stores } from 'src/stores'

type InjectedProps = {
  onlineFriends: string[]
  offlineFriends: string[]
  ignoredUsers: string[]
}

function storesToProps(stores: Stores): InjectedProps {
  const allFriends = sortBy(stores.chatStore.friends.keys())

  let onlineFriends = [] as string[]
  let offlineFriends = [] as string[]

  for (const name of allFriends) {
    const char = stores.characterStore.getCharacter(name)
    if (char.status === 'offline') {
      offlineFriends.push(name)
    } else {
      onlineFriends.push(name)
    }
  }

  const ignoredUsers = Array.from(stores.chatStore.ignored.keys())

  return { onlineFriends, offlineFriends, ignoredUsers }
}

@inject(storesToProps)
@observer
class CharacterBrowserComponent extends React.Component<InjectedProps> {
  render() {
    const { onlineFriends, offlineFriends, ignoredUsers } = this.props
    return (
      <div className="bg-color-main padding spaced-children-v scroll-v">
        <h2>Friends / Bookmarks</h2>
        {this.renderUserList(onlineFriends)}

        <h2>Offline</h2>
        {this.renderUserList(offlineFriends)}

        <h2>Ignored</h2>
        {this.renderUserList(ignoredUsers)}
      </div>
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

export const CharacterBrowser = CharacterBrowserComponent as React.ComponentClass<{}>
