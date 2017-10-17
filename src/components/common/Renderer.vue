<template>
  <component :is="component" v-bind="bindProps" v-on="bindEvents">
  </component>
</template>

<script>
export default {
  props: {
    component: { type: [String, Object], required: true },
    props: { type: Object, default: () => ({}) },
    events: { type: Object, default: () => ({}) }
  },
  computed: {
    bindProps() {
      return { ...this.props, ...this.$attrs }
    },
    bindEvents() {
      return { ...this.events, ...this.$listeners }
    }
  }
}
</script>
