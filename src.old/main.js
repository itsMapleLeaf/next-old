// @flow
import 'regenerator-runtime/runtime'
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import {store, state} from './store'

// configure keycodes
Vue.config.keyCodes = {
  enter: 13,
  space: 32,
}

// configure vue resource
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

// initialize the application store (jumpstart the app)
store.initialize()

// create vue instance
/* eslint no-new: off */
new Vue({
  el: 'body',
  render: h => h(App),
  data: {state},
})
