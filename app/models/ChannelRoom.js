export default class ChannelRoom {
  constructor (id, name) {
    this.id = id
    this.name = name
    this.description = ''
    this.mode = 'both'
    this.characters = []
    this.messages = []
    this.ops = []
  }
}
