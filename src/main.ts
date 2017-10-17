import 'normalize.css/normalize.css'
import 'mdi/css/materialdesignicons.min.css'

import './styles/colors.scss'
import './styles/fade-transition.scss'
import './styles/flex.scss'
import './styles/global.scss'
import './styles/helpers.scss'

import './styles/bbc.scss'
import './styles/character-colors.scss'

import Vue, { ComponentOptions } from 'vue'
import App from './components/App.vue'
import * as directives from './directives'
import store from './store'

type ComponentModule = { default: ComponentOptions<Vue> }

// All components in ./common/components are registered globally under a kebab-cased name
// Example:
// Icon -> icon
// MyHeaderComponent -> my-header-component
function registerGlobalComponents() {
  const context = require.context('./components/common')
  context.keys().forEach(componentFile => {
    const component = context<ComponentModule>(componentFile).default
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
