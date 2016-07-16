import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import store from './modules/vuex/store'

Vue.config.debug = true

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App},
  store
})
