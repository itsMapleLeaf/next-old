<template>
  <div class='shade'>
    <div class='icon'>
      <i class='mdi mdi-paw'></i>
    </div>
    <h3 class='text'>
      <slot></slot>
    </h3>
  </div>
</template>

<script>
export default {}
</script>

<style lang='stylus' scoped>
@require 'theme'
@require 'layout'
@require 'flex'

.shade
  fullscreen()
  flex(column)
  flex-align(center)
  background: rgba(black, 0.5)

.icon
  font-size: 500%
  animation: loading-animation 3s infinite

.text
  font-style: italic

@keyframes loading-animation
  0%   { transform: perspective(120px) rotateX(0) rotateY(0) }
  25%  { transform: perspective(120px) rotateX(0.5turn) rotateY(0) }
  50%  { transform: perspective(120px) rotateX(0.5turn) rotateY(0.5turn) }
  75%  { transform: perspective(120px) rotateX(1turn) rotateY(0.5turn) }
  100% { transform: perspective(120px) rotateX(1turn) rotateY(1turn) }
</style>
