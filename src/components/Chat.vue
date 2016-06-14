<template>
  <div class='container'>
    <div class='row row-2'>
      <div class='col-2 fg-color center-content'>
        <i class='fa fa-bars'></i>
      </div>
      <div class='grow'></div>
    </div>

    <div class='row row-6 fg-color padded'>test</div>

    <div class='divider'></div>

    <div class='row grow'>
      <div class='grow padded'>test</div>

      <div class='divider'></div>

      <div class='col-10 fg-color padded'>test</div>
    </div>

    <div class='divider'></div>

    <div class='row row-6 fg-color'>
      <chatbox></chatbox>
    </div>
  </div>
</template>

<script>
import Chatbox from './Chatbox.vue'

export default {
  components: {
    Chatbox
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/grid'
@import '../styles/components'

.padded
  padding: 0.5em 0.7em
</style>
