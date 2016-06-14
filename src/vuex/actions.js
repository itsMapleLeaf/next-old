import {http} from 'vue'
import router from '../router'
import SocketHandler from '../socket-handler'

export function submitLogin (store, account, password) {
  const url = 'https://www.f-list.net/json/getApiTicket.php'

  store.dispatch('LOGIN_REQUEST', account)

  http.post(url, { account, password })
    .then(({ data }) => {
      if (data.error) {
        store.dispatch('LOGIN_FAILURE', data.error)
      } else {
        store.dispatch('LOGIN_SUCCESS', data)
        router.go('/charselect')
      }
    })
    .catch(({ data }) => {
      store.dispatch('LOGIN_FAILURE', data)
    })
}

export function chooseCharacter (store, char) {
  store.dispatch('CHOOSE_CHARACTER', char)
}

export function connectToChatServer (store) {
  /* eslint no-new: 0 */
  new SocketHandler('main')
  store.dispatch('CONNECT_REQUEST')
}
