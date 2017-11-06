import { observable } from "mobx"
import { computed } from "mobx/lib/api/computed"
import { parseBBC } from "src/chat/util/bbc"

export class Character {
  @observable gender = ""
  @observable status = ""
  @observable statusMessage = ""

  constructor(public name: string, gender: string, status: string, statusMessage = "") {
    this.gender = gender
    this.status = status
    this.statusMessage = statusMessage
  }

  @computed
  get hasStatusMessage() {
    return this.statusMessage.trim() !== ""
  }

  @computed
  get parsedStatusMessage() {
    return { __html: parseBBC(this.statusMessage) }
  }
}
