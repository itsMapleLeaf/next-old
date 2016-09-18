<template>
  <div class='overlay-shade' @click.self="$emit('closed')">
    <div class='overlay-panel'>
      <a href='#' class='overlay-close' @click="$emit('closed')">
        <i class='mdi mdi-close'></i>
      </a>
      <div class='overlay-header'>
        <h2>{{ header }}</h2>
      </div>
      <div class='overlay-content'>
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    header: String
  }
}
</script>

<style lang='stylus' scoped>
@require 'elements/overlay'
</style>
