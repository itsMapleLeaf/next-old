<template>
  <div>
    <div class='ui section icon right hover-darken' @click='toggle'>
      <i class='fa fa-caret-down'></i> {{ items[active].label }}
    </div>
    <ol v-show='open'>
      <li class='ui theme-color dark hover-darken' v-for='item in items' @click='select($index)'>
        {{ item.label }}
      </li>
    </ol>
  </div>
</template>

<style lang="stylus" scoped>
li
  padding: 0.5em 0.5em
</style>

<script>
export default {
  props: {
    items: Array
  },

  data () {
    return {
      open: false,
      active: 0
    }
  },

  methods: {
    toggle () {
      this.open = !this.open
    },

    select (index) {
      this.active = index
      this.open = false
      this.$emit('selection', this.$get('items[active].value'))
    }
  }
}
</script>
