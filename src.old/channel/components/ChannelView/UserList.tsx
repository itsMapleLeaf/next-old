import { sortBy } from 'lodash'
import { computed } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as React from 'react'
import styled, { cx } from 'react-emotion'
import { CharacterName } from 'src/character/components/CharacterName'
import { CharacterStore } from 'src/character/stores/CharacterStore'
import { ChatStore } from 'src/chat/stores/ChatStore'
import { scrollVertical } from 'src/common/styles/helpers'

type Props = {
  characterStore?: CharacterStore
  chatStore?: ChatStore
  users: string[]
  ops: string[]
}

const ListItem = styled('div')`
  padding: 4px 8px;
`

@inject('characterStore', 'chatStore')
@observer
export class UserList extends React.Component<Props> {
  compareCharacters = (name: string) => {
    const { characterStore, chatStore } = this.props
    const char = characterStore!.getCharacter(name)
    const { friends, admins } = chatStore!

    if (admins.has(name)) return 0
    if (this.props.ops.includes(name)) return 1
    if (friends.has(name)) return 2
    if (char.status === 'looking') return 3
    return 4
  }

  @computed
  get unignoredUsers() {
    const chatStore = this.props.chatStore!
    return this.props.users.filter(user => !chatStore.isIgnored(user))
  }

  @computed
  get sortedUsers() {
    return sortBy(this.unignoredUsers, this.compareCharacters, name => name.toLowerCase())
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
    return (
      // NOTE: using scrollVertical here is required for correct height calculations in regards to
      // the user list element... for some reason
      <div className={cx('flex-column', scrollVertical)}>
        <div className={cx('bg-color-darken-2 padding')}>
          Characters ({this.props.users.length})
        </div>
        <div className={cx('bg-color-darken-1 flex-grow', scrollVertical)}>
          {this.sortedUsers.map(this.renderUser)}
        </div>
      </div>
    )
  }

  renderUser = (name: string) => {
    return (
      <ListItem className={this.getHighlightClass(name)} key={name}>
        <CharacterName name={name} />
      </ListItem>
    )
  }
}
