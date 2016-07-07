<template>
  <main class="ui-shade" :transition="'slide-' + side" @click.self="close">
    <aside :class="'flex-column ui-main ui-shadow panel-' + side">
      <section class="flex-fixed">
        <slot name="content"></slot>
      </section>
      <nav class="flex-stretch ui-dark">
        <slot name="options"></slot>
      </nav>
    </aside>
  </main>
</template>

<style scoped>
.panel-left, .panel-right {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 12em;
}

.panel-left { left: 0 }
.panel-right { right: 0 }
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
