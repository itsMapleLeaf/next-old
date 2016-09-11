// @flow
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import * as store from './store'

// import styles
// import './styles/root.styl'

// configure keycodes
Vue.config.keyCodes = {
  enter: 13,
  space: 32
}

// configure vue resource
Vue.use(VueResource)
Vue.http.options.emulateJSON = true

// make store accessible to vue components
Vue.prototype.$store = store

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  render: h => h(App)
})
