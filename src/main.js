import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'
import './styles/bbc.scss'
import './styles/character-colors.scss'
import './styles/colors.scss'
import './styles/fade-transition.scss'
import './styles/flex.scss'
import './styles/global.scss'
import './styles/helpers.scss'

import Vue from 'vue'
import App from './components/App'
import store from './store'
import * as directives from './directives'

Vue.component('overlay', require('./components/common/Overlay'))
Vue.component('icon', require('./components/common/Icon'))
Vue.component('renderer', require('./components/common/Renderer'))
Vue.component('context-menu', require('./components/common/ContextMenu'))
Vue.component('context-menu-item', require('./components/common/ContextMenuItem'))

Vue.directive('autoScroll', directives.autoScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
})

if (process.env.NODE_ENV !== 'production') {
  console.log('env:', process.env)
  window.localforage = require('localforage')
}
