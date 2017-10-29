import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled from 'react-emotion'
import { CharacterName } from 'src/character/components/CharacterName'
import { CharacterStore } from 'src/character/stores/CharacterStore'
import { ChatStore } from 'src/chat/stores/ChatStore'

type Props = {
  characterStore?: CharacterStore
  chatStore?: ChatStore
  users: string[]
  ops: string[]
}

const ListItem = styled('div')`padding: 4px 8px;`

// TODO: rename to ChannelUserList
@inject('characterStore', 'chatStore')
@observer
export class ChannelUsers extends React.Component<Props> {
  @computed
  get unignoredUsers() {
    const chatStore = this.props.chatStore!
    return this.props.users.filter(user => !chatStore.isIgnored(user))
  }

  @computed
  get sortedUsers() {
    const { characterStore, chatStore } = this.props
    return sortBy(
      this.unignoredUsers,
      name => {
        const char = characterStore!.getCharacter(name)
        const { friends, admins } = chatStore!

        if (admins.has(name)) return 0
        if (this.props.ops.includes(name)) return 1
        if (friends.has(name)) return 2
        if (char.status === 'looking') return 3
        return 4
      },
      name => name.toLowerCase(),
    )
  }

  getHighlightClass(name: string) {
    const { chatStore } = this.props
    const { friends, admins } = chatStore!

    if (admins.has(name)) return 'highlight-red'
    if (this.props.ops.includes(name)) return 'highlight-yellow'
    if (friends.has(name)) return 'highlight-blue'
    return ''
  }

  render() {
    return <div>{this.sortedUsers.map(this.renderUser)}</div>
  }

  renderUser = (name: string) => {
    return (
      <ListItem className={`${this.getHighlightClass(name)}`} key={name}>
        <CharacterName name={name} />
      </ListItem>
    )
  }
}
