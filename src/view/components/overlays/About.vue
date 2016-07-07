<template>
  <overlay panel-width='18em'>
    <p><a class='ui-link' href='https://www.f-list.net/c/alexander%20grapevine/'>
      <img src="https://static.f-list.net/images/avatar/alexander%20grapevine.png" />
    </a></p>
    <p><dev-info></dev-info></p>
  </overlay>
</template>

<style lang="stylus" scoped>
</style>

<script>
import Overlay from '../elements/Overlay.vue'
import DevInfo from '../elements/DevInfo.vue'

export default {
  components: {
    DevInfo,
    Overlay
  }
}
</script>
