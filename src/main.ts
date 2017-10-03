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
import * as directives from './common/directives'
import store from './store'

// All components in ./common/components are registered globally under a kebab-cased name
// Example:
// Icon -> icon
// MyHeaderComponent -> my-header-component
function registerGlobalComponents() {
  const context = require.context('./common/components/')
  context.keys().forEach(componentFile => {
    const component = context<{ default: any }>(componentFile).default
    const nameMatch = componentFile.match(/\.\/(\w+)\.vue$/) || []
    const name = nameMatch[1]
    if (name) {
      Vue.component(name, component)
      console.log('Registered component:', name)
    }
  })
}

// All directives are registered globally under their exported name
// autoScroll -> auto-scroll
// etc.
function registerGlobalDirectives() {
  Object.keys(directives).forEach(name => {
    Vue.directive(name, directives[name as keyof typeof directives])
    console.log('Registered directive:', name)
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
