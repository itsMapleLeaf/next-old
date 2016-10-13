<template>
  <div class='profile-info'>
    <div class='profile-info-row' v-for='field in info'>
      <div class='profile-info-field'>
        <strong>{{ field.label }}</strong>
      </div>
      <div class='profile-info-value' v-html='field.value'></div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    info: Array,
  }
}
</script>

<style lang='stylus' scoped>
@import 'vars'

.profile-info
  background: theme-darker(20%)

.profile-info-row
  display: flex
  justify-content: space-between
  flex-wrap: wrap
  line-height: 1.3
  padding: 0.3rem

.profile-info-row:nth-child(2n)
  background: theme-darker(30%)

.profile-info-field
  margin: 0 0.3rem
  flex-grow: 1

.profile-info-value
  margin: 0 0.3rem
</style>
