import { observable } from 'mobx'

export class Character {
  @observable gender = ''
  @observable status = ''
  @observable statusMessage = ''

  constructor(public name: string, gender: string, status: string, statusMessage = '') {
    this.gender = gender
    this.status = status
    this.statusMessage = statusMessage
  }
}
