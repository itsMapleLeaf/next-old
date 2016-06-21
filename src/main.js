import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import store from './vuex/store'
import parseBBC from './bbcode'

import './styles/base.styl'

Vue.filter('bbcode', parseBBC)

Vue.config.debug = true

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App},
  store
})
