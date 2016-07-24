import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './view/App.vue'
// import store from './modules/vuex/store'

import './styles.styl'

Vue.config.debug = true

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  render: h => h(App)
})
