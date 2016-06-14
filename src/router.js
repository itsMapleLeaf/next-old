import Vue from 'vue'
import VueRouter from 'vue-router'
import Chat from './components/Chat.vue'
import Login from './components/Login.vue'
import CharacterSelect from './components/CharacterSelect.vue'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/': {
    component: Chat,
    subRoutes: {
      '/login': {
        component: Login
      },
      '/charselect': {
        component: CharacterSelect
      }
    }
  }
})

export default router
