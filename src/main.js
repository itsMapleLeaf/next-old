import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'
import './styles/bbc.scss'
import './styles/character-colors.scss'
import './styles/colors.scss'
import './styles/flex.scss'
import './styles/global.scss'
import './styles/helpers.scss'

import Vue from 'vue'
import App from './components/App'
import store from './store'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
})

if (process.env.NODE_ENV !== 'production') {
  window.localforage = require('localforage')
}
