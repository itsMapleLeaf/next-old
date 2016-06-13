import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from './components/Login.vue'
import CharacterSelect from './components/CharacterSelect.vue'

Vue.use(VueRouter)

const router = new VueRouter()

router.map({
  '/login': {
    component: Login
  },
  '/charselect': {
    component: CharacterSelect
  }
})

export default router
