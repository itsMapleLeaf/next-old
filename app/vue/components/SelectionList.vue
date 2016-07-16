<template>
  <div class="ui-color-dark ui-border ui-scroll selection">
    <slot></slot>
  </div>
</template>

<style lang="stylus">
@import '../styles/ui.styl'

.selection
  width: 14em
  height: 18em

.selection *
  display: block
  padding: 0.5em

.selection .active
  @extend .ui-highlight-green
</style>
