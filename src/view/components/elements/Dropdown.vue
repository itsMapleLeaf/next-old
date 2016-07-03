<template>
  <div>
    <span class='ui section icon right hover-darken noselect head' @click='toggle'>
      <i class='fa fa-caret-down'></i> {{ valueLabel }}
    </span>
    <ol class='ui theme-color dark border shadow' v-show='open' transition="collapse" v-el:list-items @click='selectItem($event)'>
      <slot></slot>
    </ol>
  </div>
</template>

<style lang="stylus" scoped>
div
  display: inline-block
  text-align: left
  position: relative
  width: 10em

.head
  width: 100%
  z-index: 10000

ol
  width: 100%
  position: absolute
  z-index: 9999
</style>

<script>
export default {
  data () {
    return {
      open: false,
      selected: undefined
    }
  },

  ready () {
    const {children} = this.$els.listItems
    for (let item of children) {
      item.style.padding = '0.5em'
      item.classList.add('ui', 'theme-color', 'dark', 'hover-darken')
    }
    this.selected = children[0]
  },

  methods: {
    toggle () {
      this.open = !this.open
    },

    selectItem (event) {
      this.selected = event.target
      this.open = false
    }
  },

  computed: {
    value () {
      if (this.selected) {
        const value = this.selected.getAttribute('value')
        return value !== null ? value : this.selected.innerText
      } else {
        return ''
      }
    },

    valueLabel () {
      return this.selected ? this.selected.innerText : ''
    }
  }
}
</script>
