import { observable } from 'mobx'

export class Character {
  @observable status = ''
  @observable statusMessage = ''

  constructor(public name: string, public gender: string, status: string, statusMessage = '') {
    this.status = status
    this.statusMessage = statusMessage
  }
}
