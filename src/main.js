import Vue from 'vue'
import VueResource from 'vue-resource'
import App from './components/App.vue'
import router from './router'

Vue.use(VueResource)

Vue.http.options.emulateJSON = true

router.go('/login')
router.start(App, '#app-root')
