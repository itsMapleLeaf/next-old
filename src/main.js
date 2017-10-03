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
import kebabCase from 'lodash/kebabCase'

// All components in ./common/components are registered globally under a kebab-cased name
// Example:
// Icon -> icon
// MyHeaderComponent -> my-header-component
function registerGlobalComponents() {
  const context = require.context('./common/components/')
  context.keys().forEach(name => {
    const component = context(name).default
    Vue.component(kebabCase(name), component)
  })
}

// All directives are registered globally under their exported name
// autoScroll -> auto-scroll
// etc.
function registerGlobalDirectives() {
  Object.keys(directives).forEach(name => {
    Vue.directive(name, directives[name])
  })
}

function main() {
  registerGlobalComponents()
  registerGlobalDirectives()

  const app = new Vue({
    render: h => h(App),
    store,
  })

  app.$mount('#app')
}

main()
