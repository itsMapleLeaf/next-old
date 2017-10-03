<template>
  <transition name="overlay" mode="in-out" appear>
    <div class="shade" @click.self="$emit('shadeclick')">
      <div class="panel bg-color-main">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
.shade {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  align-items: center;
  justify-content: center;
}

.panel {
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
}

@keyframes fade-in {
  from {
    opacity: 0
  }
  to {
    opacity: 1
  }
}

@keyframes slide-down {
  from {
    transform: translateY(-30px)
  }
  to {
    transform: translateY(0)
  }
}

.overlay-enter-active {
  animation: fade-in 0.35s;
  .panel {
    animation: slide-down 0.35s;
  }
}

.overlay-leave-active {
  animation: fade-in 0.35s reverse;
  .panel {
    animation: slide-down 0.35s reverse;
  }
}
</style>
