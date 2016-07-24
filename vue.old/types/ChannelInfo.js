export default class ChannelInfo {
  id: string
  name: string
  users: number

  constructor (id, name, users) {
    this.id = id
    this.name = name
    this.users = users
  }
}
