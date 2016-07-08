<template>
  <div class="ui-shade" transition="fade" @click='close'></div>
  <aside :class="'flex-column ui-main ui-shadow panel-' + side" :transition="'slide-' + side">
    <section class="flex-fixed">
      <slot name="content"></slot>
    </section>
    <nav class="flex-stretch ui-dark">
      <slot name="options"></slot>
    </nav>
  </aside>
</template>

<style lang="stylus" scoped>
section {
  padding: 0em 1em;
}

for $side in 'left' 'right' {
  .panel-{$side} {
    position: absolute
    top: 0
    bottom: 0
    width: 12em
    {$side}: 0
  }
}
</style>

<script>
import {store} from 'modules/store'

export default {
  props: {
    side: {
      type: String,
      default: 'left'
    }
  },

  methods: {
    close () {
      store.notify('PopOverlay')
    }
  }
}
</script>
