import sortBy from 'lodash/sortBy'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import { CharacterName } from 'src/character/components/CharacterName'
import { CharacterStore } from 'src/character/stores/CharacterStore'
import { ChatStore } from 'src/chat/stores/ChatStore'
import styled from 'styled-components'

type Props = {
  characterStore?: CharacterStore
  chatStore?: ChatStore
  users: string[]
  ops: string[]
}

const ListItem = styled.div`padding: 4px 8px;`

@inject('characterStore', 'chatStore')
@observer
export class ChannelUsers extends React.Component<Props> {
  @computed
  get sortedUsers() {
    const { characterStore, chatStore } = this.props
    return sortBy(
      this.props.users,
      name => {
        const char = characterStore!.getCharacter(name)
        const { friends, admins, ignored } = chatStore!

        if (admins[name]) return 0
        if (this.props.ops.includes(name)) return 1
        if (friends[name]) return 2
        if (char.status === 'looking') return 3
        if (ignored[name]) return 999999
        return 4
      },
      name => name.toLowerCase(),
    )
  }

  getHighlightClass(name: string) {
    const { chatStore } = this.props
    const { friends, admins } = chatStore!

    if (admins[name]) return 'highlight-red'
    if (this.props.ops.includes(name)) return 'highlight-yellow'
    if (friends[name]) return 'highlight-blue'
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
