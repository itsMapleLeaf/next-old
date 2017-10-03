import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './app/styles/colors.scss'
import './app/styles/fade-transition.scss'
import './app/styles/flex.scss'
import './app/styles/global.scss'
import './app/styles/helpers.scss'

import './chat/styles/bbc.scss'
import './chat/styles/character-colors.scss'

import Vue from 'vue'
import App from './app/components/App.vue'
import store from './store'
import * as directives from './directives'

Vue.component('overlay', require('./common/components/Overlay.vue').default)
Vue.component('icon', require('./common/components/Icon.vue').default)
Vue.component('renderer', require('./common/components/Renderer.vue').default)
Vue.component('context-menu', require('./common/components/ContextMenu.vue').default)
Vue.component('context-menu-item', require('./common/components/ContextMenuItem.vue').default)

Vue.directive('autoScroll', directives.autoScroll)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(App),
  store,
})
