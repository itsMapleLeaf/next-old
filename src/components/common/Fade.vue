<template>
  <transition :name="name">
    <slot></slot>
  </transition>
</template>

<script>
export default {
  props: {
    in: Boolean,
    out: Boolean,
  },
  computed: {
    name() {
      if (this.in) return 'fade-in'
      if (this.out) return 'fade-out'
      return 'fade'
    }
  }
}
</script>


<style lang="scss" scoped>
@keyframes fade-in {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}

.fade-enter-active {
  animation: 0.2s fade-in;
}

.fade-leave-active {
  animation: 0.2s fade-in reverse;
}

.fade-in-enter-active {
  animation: 0.2s fade-in;
}

.fade-out-leave-active {
  animation: 0.2s fade-in reverse;
}
</style>
