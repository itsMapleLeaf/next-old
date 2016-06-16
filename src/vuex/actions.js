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
    .catch(() => {
      const err = "Could not connect to F-List website. They're either doing maintenance, or someone spilled coke on the servers again."
      store.dispatch('LOGIN_FAILURE', err)
      reject(err)
    })
  })
}

export function chooseCharacter (store, char) {
  store.dispatch('CHOOSE_CHARACTER', char)
}

export function connectToChatServer (store, ...identInfo) {
  return new SocketHandler().connect('main', ...identInfo)
}

export function setCurrentOverlay (store, overlay) {
  store.dispatch('SET_OVERLAY', overlay)
}

export function joinChannel (store, id, name) {
  store.dispatch('CHANNEL_JOIN_REQUEST', id, name)
}

export function leaveChannel (store, id) {
  store.dispatch('CHANNEL_LEAVE_REQUEST', id)
}

export function selectChannel (store, id) {
  store.dispatch('SELECT_CHANNEL', id)
}
