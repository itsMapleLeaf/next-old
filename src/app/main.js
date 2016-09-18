// @flow
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import {store, state} from './store'

// configure keycodes
Vue.config.keyCodes = {
  enter: 13,
  space: 32
}

// configure vue resource
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

// initialize the application store (jumpstart the app)
store.init()

// create vue instance
/* eslint no-new: 0 */
new Vue({
  el: 'body',
  render: h => h(App),
  data: {state}
})
