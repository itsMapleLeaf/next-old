import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import store from './vuex/store'

import './styles/base.sss'

Vue.use(VueResource)

Vue.debug = true
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App},
  store
})
