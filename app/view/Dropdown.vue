<template>
  <div class='ui-border' @click='open = !open'>
    <div class='color-dark ui-padding-3 ui-pointer'>
      {{ currentLabel }} <span><i class='mdi mdi-chevron-down' style='float: right'></i></span>
    </div>
    <template v-if='open'>
      <div class='color-darker ui-padding-3 ui-pointer' v-for='item in items' @click="$emit('input', item.value)">
        {{ item.label }}
      </div>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    value: String
  },

  data () {
    return { open: false }
  },

  computed: {
    currentLabel () {
      const item = this.items.find(item => item.value === this.value)
      return item.label || item.value
    }
  }
}
</script>
