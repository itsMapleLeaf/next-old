import {http} from 'vue'

export function submitLogin (store, account, password) {
  const url = 'https://www.f-list.net/json/getApiTicket.php'

  store.dispatch('LOGIN_REQUEST', account)

  http.post(url, { account, password })
    .then(({ data }) => {
      if (data.error) {
        store.dispatch('LOGIN_FAILURE', data.error)
      } else {
        store.dispatch('LOGIN_SUCCESS', data)
      }
    })
    .catch(({ data }) => {
      store.dispatch('LOGIN_FAILURE', data)
    })
}
