<template>
  <div class='ui overlay' @click.self='close'>
    <section class='ui panel'>
      <p><a class='ui link' href='https://www.f-list.net/c/alexander%20grapevine/'>
        <img src="https://static.f-list.net/images/avatar/alexander%20grapevine.png" />
      </a></p>
      <p><dev-info></dev-info></p>
    </section>
  </div>
</template>

<style lang="stylus" scoped>
.panel
  width: 18em
  padding: 1em
</style>

<script>
import DevInfo from '../elements/DevInfo.vue'
import {PopOverlay} from '../../lib/events'

export default {
  components: {
    DevInfo
  },

  methods: {
    close () {
      this.$dispatch(PopOverlay)
    }
  }
}
</script>
