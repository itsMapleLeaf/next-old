<template>
  <div class='dropdown' @click='toggle'>
    <span>
      {{ items[selected] }} <i class='fa fa-caret-down' style='float: right'></i>
    </span>
    <ol class='dropdown-list' v-if='open'>
      <li v-for='item in items'>{{ item }}</li>
    </ol>
  </div>
</template>

<script>
  export default {
    props: {
      items: Array
    },

    methods: {
      toggle () {
        this.open = !this.open
      }
    },

    data () {
      return {
        selected: 0,
        open: false
      }
    }
  }
</script>

<style lang="stylus" scoped>
@import '../styles/base'
@import '../styles/mixins'
@import '../styles/variables'

.dropdown
  input-styles(10em)

  display: inline-block
  padding: input-padding
  font-size: input-font-size
  user-select: none

  +transition(hover)
    background: darken(bg-color, 15%)
    cursor: pointer
</style>
