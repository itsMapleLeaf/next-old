<template>
  <transition name='fade'>
    <a href='#'
      class='flex flex-align-center flex-justify-space-between ui-width-5 ui-divide-left'
      :class="active ? 'color-main' : 'color-dark ui-faded'">
      <span class='ui-ellipsis ui-padding-subtle'><slot></slot></span>
      <span class='ui-padding-subtle ui-small ui-faded' @click.stop="$emit('closed')"><i class='mdi mdi-close'></i></span>
    </a>
  </transition>
</template>

<script>
export default {
  props: {
    active: Boolean
  }
}
</script>
