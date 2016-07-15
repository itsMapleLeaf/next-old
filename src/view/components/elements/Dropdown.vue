<template>
  <div class='ui-dropdown'>
    <a class='ui-dropdown-head' href='#' @click='toggle'>
      {{ valueLabel }} <i class='fa fa-fw fa-caret-down' style='float: right; opacity: 0.5'></i>
    </a>
    <div class='ui-dropdown-items' v-show='open' transition="collapse" v-el:list-items @click='selectItem($event)'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initValue: ''
  },

  data () {
    return {
      open: false,
      selected: undefined
    }
  },

  ready () {
    const {children} = this.$els.listItems
    for (let item of children) {
      if ((item.getAttribute('value') || item.innerText) === this.initValue) {
        this.selected = item
      }
    }
    this.selected = this.selected || children[0]
  },

  methods: {
    toggle () {
      this.open = !this.open
    },

    selectItem (event) {
      this.selected = event.target
      this.open = false
      this.$emit('changed', this.value)
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
