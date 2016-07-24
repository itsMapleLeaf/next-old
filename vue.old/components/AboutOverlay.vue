<template>
  <overlay>
    <section>
      <p><avatar character='Alexander Grapevine'></avatar></p>
      <dev-info></dev-info>
    </section>
  </overlay>
</template>

<style scoped>
section { width: 16em }
</style>

<script>
import Avatar from './CharacterAvatarLink.vue'
import Overlay from './Overlay.vue'
import DevInfo from './DevInfo.vue'

export default {
  components: {DevInfo, Overlay, Avatar}
}
</script>
