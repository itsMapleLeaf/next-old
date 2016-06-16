<template>
  <div class='dropdown'>
    <div class='head' @click='toggle'>
      {{ items[selected].label }} <i class='fa fa-caret-down' style='float: right'></i>
    </div>
    <ol class='list material-shadow' v-show='open'>
      <li class='list-item' v-for='item in items' @click='select($index)'>
        {{ item.label }}
      </li>
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
      },

      select (index) {
        this.selected = index
        this.open = false
        this.$emit('selection', this.items[this.selected])
      }
    },

    data () {
      return {
        open: false,
        selected: 0
      }
    }
  }
</script>

<style lang="stylus" scoped>
@require '../styles/mixins'
@require '../styles/variables'

.dropdown
  input-styles(input-width)
  position: relative
  display: inline-block
  font-size: input-font-size
  user-select: none

.list
  background: darken(bg-color, 25%)

.head, .list-item
  +transition(hover)
    background: rgba(0, 0, 0, 0.35)
    cursor: pointer

  padding: input-padding
</style>
