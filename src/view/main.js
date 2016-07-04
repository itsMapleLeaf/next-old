import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'view/components/App.vue'
import parseBBC from 'modules/bbcode'
import {collapse} from 'view/transitions'

Vue.config.debug = true

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

Vue.filter('bbcode', parseBBC)
Vue.transition('collapse', collapse)

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App}
})
