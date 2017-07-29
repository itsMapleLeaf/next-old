import 'regenerator-runtime/runtime'
import Vue from 'vue'
import App from './components/App.vue'
import { store, state } from './store'

new Vue({
  el: '#app',
  render: h => h(App),
  data: { state },
})

store.initialize()
