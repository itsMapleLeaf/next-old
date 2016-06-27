<template>
  <div class='dropdown bg-color border-highlight'>
    <div class='head hover-darken' @click='toggle'>
      {{ items[selected].label }} <i class='fa fa-caret-down' style='float: right'></i>
    </div>
    <ol class='list' v-show='open'>
      <li class='list-item hover-darken' v-for='item in items' @click='select($index)'>
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

  data () {
    return {
      open: false,
      selected: 0
    }
  },

  methods: {
    toggle () {
      this.open = !this.open
    },

    select (index) {
      this.selected = index
      this.open = false
      this.$emit('selection', this.$get('items[selected].value'))
    }
  }
}
</script>

<style lang="stylus">
/*@import '../styles/variables'

.dropdown
  margin: input-margin

.head, .list-item
  padding: 0.4em 0.7em
  user-select: none
  padding: input-padding*/
</style>
