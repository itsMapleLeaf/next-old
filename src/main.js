import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import parseBBC from './filters/bbcode'

Vue.config.debug = true
Vue.config.devtools = true

Vue.filter('bbcode', parseBBC)

console.log(parseBBC('[url]https://www.google.com[/url]'))
console.log(parseBBC('[url=http://www.google.com]http://www.google.com[/url]'))
console.log(parseBBC('https://www.google.com'))
console.log(parseBBC('[sub]http://example.website.com[/sub]'))

Vue.use(VueResource)
Vue.http.options.emulateJSON = true

// make the collapse transition fluid to the element height
Vue.transition('collapse', {
  css: false,

  enter (el, done) {
    el.style.transition = 'ease 0.3s max-height'
    el.style.maxHeight = el.scrollHeight + 'px'
    el.style.overflow = 'hidden'
    window.setTimeout(done, 300)
  },

  leave (el, done) {
    el.style.maxHeight = '0px'
    window.setTimeout(done, 300)
  }
})

/* eslint no-new: 0 */
new Vue({
  el: 'body',
  components: {App}
})
