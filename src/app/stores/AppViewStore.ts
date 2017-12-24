import { action, observable } from 'mobx'

export type View = 'none' | 'loading' | 'login' | 'characterSelect' | 'chat'

export class AppViewStore {
  @observable loginStatus = ''
  @observable loadingMessage = ''
  @observable view: View = 'none'

  @action.bound
  showLoading(message: string) {
    this.loadingMessage = message
    this.view = 'loading'
  }

  @action.bound
  showLogin(statusMessage = '') {
    this.loginStatus = statusMessage
    this.view = 'login'
  }

  @action.bound
  showCharacterSelect() {
    this.view = 'characterSelect'
  }

  @action.bound
  showChat() {
    this.view = 'chat'
  }
}
