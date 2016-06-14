import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import store from './vuex/store'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App},
  store
})
