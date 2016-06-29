<template>
  <div class="ui overlay" @click.self="$dispatch('overlay-change-request', '')">
    <div class="ui side-panel {{side}} flex col">
      <div class="flex fixed">
        <slot name="content"></slot>
      </div>
      <div class="flex stretch ui theme-color dark">
        <slot name="options"></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    side: {
      type: String,
      default: 'left'
    }
  }
}
</script>
