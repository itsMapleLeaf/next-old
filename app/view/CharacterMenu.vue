<template>
  <div class='ui-overlay' @click.self='close'>
    <div class='ui-panel-right ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <menu-header :header='character.name' :character='character.name'></menu-header>
      </section>

      <section class='flex-grow color-dark'>
        <!-- <menu-option v-for='opt in options'
          :text='opt.text'
          :icon='opt.icon'
          :action='opt.action'>
        </menu-option> -->
      </section>
    </div>
  </div>
</template>

<script>
import MenuHeader from './MenuHeader.vue'
import MenuOption from './MenuOption.vue'
import store from '../store'

export default {
  components: {MenuHeader, MenuOption},

  data () {
    return { store }
  },

  computed: {
    character () { return this.store.characterMenuFocus }
  },

  methods: {
    close () {
      this.store.popOverlay()
    }
  }
}
</script>
