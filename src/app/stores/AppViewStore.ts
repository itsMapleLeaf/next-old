import { action, observable } from 'mobx'

export type View = 'none' | 'loading' | 'login' | 'characterSelect' | 'chat'

export class AppViewStore {
  @observable loginStatus = ''
  @observable loadingMessage = ''
  @observable view: View = 'none'

  @action
  showLoading(message: string) {
    this.loadingMessage = message
    this.view = 'loading'
  }

  @action
  showLogin(statusMessage = '') {
    this.loginStatus = statusMessage
    this.view = 'login'
  }

  @action
  showCharacterSelect() {
    this.view = 'characterSelect'
  }

  @action
  showChat() {
    this.view = 'chat'
  }
}
