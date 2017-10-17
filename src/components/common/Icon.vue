<template>
  <img class="icon" :src="`/static/icons/${iconName}.svg`" :alt="iconName" :style="style">
</template>

<script>
export default {
  props: {
    size: {
      type: Number,
      default: 18
    }
  },
  computed: {
    iconName() {
      return this.$slots.default[0].text
    },
    style() {
      return { width: this.size + 'px', height: this.size + 'px' }
    }
  }
}
</script>

<style lang="scss" scoped>
.icon {
  display: inline-block;
  vertical-align: middle;
}
</style>
