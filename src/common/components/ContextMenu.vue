<template>
  <div class="context-menu bg-color-darken-1" v-fit-on-screen="{ x, y }">
    <slot></slot>
  </div>
</template>

<script>
import Vue from 'vue'

export default {
  props: {
    x: Number,
    y: Number
  },
  directives: {
    fitOnScreen(el, binding) {
      Vue.nextTick(() => {
        const rect = el.getBoundingClientRect()
        const pos = binding.value
        const left = pos.x + rect.width < window.innerWidth ? pos.x : pos.x - rect.width
        const top = pos.y + rect.height < window.innerHeight ? pos.y : pos.y - rect.height
        el.style.left = left + 'px'
        el.style.top = top + 'px'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.context-menu {
  position: fixed;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
}
</style>
