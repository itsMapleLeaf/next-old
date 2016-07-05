import Vue from 'vue'
import VueResource from 'vue-resource'
import App from 'view/components/App.vue'
import {parseBBC} from 'view/filters'
import {collapse} from 'view/transitions'
import {socket} from 'modules/socket'
import {store} from 'modules/store'
import {inspect} from 'util'

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

Vue.filter('bbcode', parseBBC)
Vue.transition('collapse', collapse)

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App},
  data: {socket, store},
  created () {
    this.socket.setStore(this.store)
  },
  watch: {
    'store.state' (state) {
      console.log('State change')
      console.log(inspect(state))
    }
  }
})
