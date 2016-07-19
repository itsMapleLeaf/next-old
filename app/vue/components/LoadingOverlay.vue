<!--
  TODO: convert this from an overlay into a simple icon in the background
  which shows on a simple "loading: boolean" property from the store

  TODO: also let us give a message for the loading screen
-->

<template>
  <div class="ui-overlay" transition="overlay">
    <div class="ui-overlay-shade"></div>
    <div class="flex-column flex-center-children">
      <i class="mdi mdi-paw"></i>
      <h3><em>Working on it...</em></h3>
    </div>
  </div>
</template>

<style lang="stylus" scoped>
turning($x, $y, $z)
  transform: perspective(300px) rotateX(unit($x, turn)) rotateY(unit($y, turn)) rotateZ(unit($z, turn))

@keyframes rotate
  0% { turning: 0 0 0 }
  25% { turning: 0 0.5 0 }
  50% { turning: 0.5 0.5 0 }
  75% { turning: 0.5 1 0 }
  100% { turning: 1 1 0 }

i
  font-size: 5rem
  animation-name: rotate
  animation-duration: 3.5s
  animation-iteration-count: infinite
  animation-timing-function: ease-out

i, h3
  color: rgba(white, 0.7)
</style>
