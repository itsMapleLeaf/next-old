<template>
  <div class='shade fullscreen flex-column flex-center'>
    <div>
      <icon class='icon' :size="100">paw</icon>
    </div>
    <h2 class='text'>
      <slot></slot>
    </h2>
  </div>
</template>

<script>
export default {}
</script>

<style lang='scss' scoped>
.shade {
  background: rgba(black, 0.5);
}

.icon {
  animation: loading-animation 4s infinite;
  opacity: 0.3;
}

.text {
  font-style: italic;
}

@keyframes loading-animation {
  0% {
    transform: perspective(180px) rotateX(0) rotateY(0);
  }
  25% {
    transform: perspective(180px) rotateX(0.5turn) rotateY(0);
  }
  50% {
    transform: perspective(180px) rotateX(0.5turn) rotateY(0.5turn);
  }
  75% {
    transform: perspective(180px) rotateX(1turn) rotateY(0.5turn);
  }
  100% {
    transform: perspective(180px) rotateX(1turn) rotateY(1turn);
  }
}
</style>
