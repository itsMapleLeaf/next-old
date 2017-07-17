<template>
  <transition name="fade" appear>
    <div class="overlay-shade">
      <div class="overlay-content">
        <slot></slot>
      </div>
    </div>
  </transition>
</template>

<style>
.overlay-shade {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;

  background-color: rgba(0, 0, 0, 0.5);

  display: flex;
  flex-direction: column;
}

.overlay-content {
  margin: auto;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.5);
}

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
