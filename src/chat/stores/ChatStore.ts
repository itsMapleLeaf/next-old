import { fromPairs } from 'lodash'
import { action, computed, observable } from 'mobx'
import { CharacterStore } from 'src/character/stores/CharacterStore'

export class ChatStore {
  @observable identity = ''
  friends = observable.map<true>()
  admins = observable.map<true>()
  ignored = observable.map<true>()

  constructor(private characters: CharacterStore) {}

  @action
  setFriends(friends: string[]) {
    this.friends.merge(fromPairs(friends.map(name => [name, true])))
  }

  @action
  setAdmins(admins: string[]) {
    this.admins.merge(fromPairs(admins.map(name => [name, true])))
  }

  @action
  setIgnored(ignored: string[]) {
    this.ignored.merge(fromPairs(ignored.map(name => [name, true])))
  }

  @action
  addIgnoredUser(name: string) {
    this.ignored.set(name, true)
  }

  @action
  removeIgnoredUser(name: string) {
    this.ignored.delete(name)
  }

  @action
  setIdentity(identity: string) {
    this.identity = identity
  }

  @computed
  get identityCharacter() {
    return this.characters.getCharacter(this.identity)
  }

  isIgnored(name: string) {
    return this.ignored.has(name)
  }
}
