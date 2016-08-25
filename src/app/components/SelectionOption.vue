<template lang="pug">
a.ui-block.ui-padding-3.ui-transition(href='#', :class="active ? 'highlight-green' : ''", @click="select")
  slot
</template>

<script>
export default {
  props: {
    active: Boolean
  },

  methods: {
    select () {
      this.$emit('input', this.option)
    }
  }
}
</script>
