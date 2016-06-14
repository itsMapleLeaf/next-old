import {http} from 'vue'
import SocketHandler from '../socket-handler'

export function submitLogin (store, account, password) {
  const url = 'https://www.f-list.net/json/getApiTicket.php'

  store.dispatch('LOGIN_REQUEST', account)

  return new Promise((resolve, reject) => {
    http.post(url, { account, password })
    .then(({ data }) => {
      if (data.error) {
        store.dispatch('LOGIN_FAILURE', data.error)
        reject(data.error)
      } else {
        store.dispatch('LOGIN_SUCCESS', data)
        resolve(data)
      }
    })
    .catch(({ data }) => {
      store.dispatch('LOGIN_FAILURE', data)
      reject(data)
    })
  })
}

export function chooseCharacter (store, char) {
  store.dispatch('CHOOSE_CHARACTER', char)
}

export function connectToChatServer (store) {
  /* eslint no-new: 0 */
  return new SocketHandler().connect('main')
}

export function setCurrentOverlay (store, overlay) {
  store.dispatch('SET_OVERLAY', overlay)
}
