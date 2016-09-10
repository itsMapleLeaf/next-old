// @flow
import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'

import './styles/root.styl'

Vue.config.keyCodes = {
  enter: 13,
  space: 32
}

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  render: h => h(App)
})
