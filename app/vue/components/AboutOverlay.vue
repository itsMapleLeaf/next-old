<template>
  <overlay>
    <section>
      <p><a class='ui-link' href='https://www.f-list.net/c/alexander%20grapevine/'>
        <img src="https://static.f-list.net/images/avatar/alexander%20grapevine.png" />
      </a></p>
      <p><dev-info></dev-info></p>
    </section>
  </overlay>
</template>

<style scoped>
section { width: 18em }
</style>

<script>
import Overlay from './Overlay.vue'
import DevInfo from './DevInfo.vue'

export default {
  components: {
    DevInfo,
    Overlay
  }
}
</script>
