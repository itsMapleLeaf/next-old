import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import store from './vuex/store'
import parseBBC from './bbcode'

import './styles/base.styl'
import './styles/chat-colors.styl'

Vue.config.debug = true
Vue.config.devtools = true

Vue.filter('bbcode', parseBBC)

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App},
  store
})
