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
