import Vue from 'vue'
import App from './components/App.vue'
import { store, state } from './store'
import './styles/main.styl'

new Vue({
  el: '#app',
  render: h => h(App),
  data: { state },
})

store.initialize()
