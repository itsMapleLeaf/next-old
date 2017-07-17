<template>
  <transition name="fade" appear>
    <slot></slot>
  </transition>
</template>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fade-enter-active {
  animation: fade-in 0.3s;
}

.fade-leave-active {
  animation: fade-in 0.3s reverse;
}
</style>
