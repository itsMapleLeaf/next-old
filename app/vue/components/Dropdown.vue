<template>
  <div class='ui-dropdown'>
    <a class='ui-dropdown-head' href='#' @click='toggle'>
      <i class='ui-icon mdi mdi-menu-down'></i> {{ label }}
    </a>
    <div class='ui-dropdown-items' v-show='open' v-el:list-items transition="collapse" @click='selectItem($event)'>
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    value: ''
  },

  data () {
    return {
      open: false
    }
  },

  methods: {
    toggle () {
      this.open = !this.open
    },

    selectItem (event) {
      this.open = false
      this.$emit('input', event.target.getAttribute('value') || event.target.innerHTML)
    }
  },

  computed: {
    label () {
      const el = Array.from(this.$els.listItems.children).find(el => {
        return el.getAttribute('value') === this.value || el.innerHTML === this.value
      })
      return el ? el.innerHTML : ''
    }
  }
}
</script>
