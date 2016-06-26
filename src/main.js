import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import parseBBC from './bbcode'

Vue.config.debug = true
Vue.config.devtools = true

Vue.filter('bbcode', parseBBC)

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App}
})
