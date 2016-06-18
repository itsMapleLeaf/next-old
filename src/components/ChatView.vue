<template>
  <div class='fg-color overflow'>
    <slot name='header'></slot>
  </div>

  <div class='divider'></div>

  <div class='row grow'>
    <div class='grow overflow'>
      <slot name='content'></slot>
    </div>

    <div class='divider'></div>

    <div class='col-10 fg-color overflow'>
      <slot name='sidebar'></slot>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang='stylus'>
@import '../styles/grid'
@import '../styles/components'
</style>
