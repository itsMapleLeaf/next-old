<template>
  <ul class='bg-color border-highlight'>
    <li v-for='item in items'
      class='hover-darken'
      :class="{ 'green-highlight': isSelected(item) }"
      @mousedown='select(item)'>

      {{{ item.label }}}
    </li>
  </ul>
</template>

<script>
export default {
  props: {
    items: {
      type: Array,
      default: []
    },
    multiple: {
      type: Boolean,
      default: false
    },
    init: {
      default: null
    }
  },

  data () {
    return {
      selectedItems: []
    }
  },

  ready () {
    if (!this.multiple) {
      const item = this.items.find(item => item.value === this.init) || this.items[0]
      this.selectedItems = [item]
    } else {
      this.selectedItems = this.init ? this.init.splice() : []
    }
  },

  methods: {
    isSelected (item) {
      return this.selectedItems.indexOf(item) > -1
    },

    select (item) {
      if (this.multiple) {
        if (this.isSelected(item)) {
          this.selectedItems.$remove(item)
          this.$emit('deselected', item.value)
        } else {
          this.selectedItems.push(item)
          this.$emit('selected', item.value)
        }
      } else {
        const prev = this.selectedItems[0]
        this.selectedItems = [item]
        this.$emit('deselected', prev.value)
        this.$emit('selected', item.value)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../styles/variables'

ul
  width: 14em
  height: 16em
  overflow: auto

li
  padding: 0.5em
  cursor: pointer
  user-select: none
</style>
