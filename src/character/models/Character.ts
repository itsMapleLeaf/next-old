import { computed, observable, action } from 'mobx'
import { parseBBC } from 'src/chat/util/bbc'

export class Character {
  @observable gender = ''
  @observable status = ''
  @observable statusMessage = ''

  constructor(public name: string, gender: string, status: string, statusMessage = '') {
    this.setGender(gender)
    this.setStatus(status, statusMessage)
  }

  @action
  setGender(gender: string) {
    this.gender = gender
  }

  @action
  setStatus(status: string, statusMessage: string) {
    this.status = status
    this.statusMessage = statusMessage
  }

  @computed
  get hasStatusMessage() {
    return this.statusMessage.trim() !== ''
  }

  @computed
  get parsedStatusMessage() {
    if (this.hasStatusMessage) {
      return { __html: parseBBC(this.statusMessage) }
    }
    return { __html: '' }
  }
}
