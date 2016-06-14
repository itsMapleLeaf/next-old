import {http} from 'vue'
import router from '../router'
import {getAccount, getApiTicket, getCharacterName} from './getters'

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
  const url = 'wss://chat.f-list.net:9799'

  /* eslint no-undef: 0 */
  const socket = new WebSocket(url)

  socket.onopen = () => {
    store.dispatch('SOCKET_OPENED', socket)

    const {state} = store
    const params = {
      method: 'ticket',
      account: getAccount(state),
      ticket: getApiTicket(state),
      character: getCharacterName(state),
      cname: 'fchat-next',
      cversion: '0.1.0'
    }

    socket.send(`IDN ${JSON.stringify(params)}`)
    store.dispatch('CHAT_IDENTIFY_REQUEST')
  }

  socket.onclose = () => {
    store.dispatch('SOCKET_CLOSED')
  }

  socket.onerror = (err) => {
    store.dispatch('SOCKET_ERROR', err)
  }

  socket.onmessage = ({ data }) => {
    const command = data.substring(0, 3)
    const params = data.length > 3 ? data.substring(4) : {}
    handleChatCommand(store, command, params)
  }

  store.dispatch('CONNECT_REQUEST')
}

export function handleChatCommand (store, command, params) {
  switch (command) {
    case 'IDN':
      store.dispatch('CHAT_IDENTIFY_SUCCESS')
      break

    default:
      console.warn(`Unknown command ${command} with params ${JSON.stringify(params)}`)
  }
}
