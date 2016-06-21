<template>
  <a :href="character.getProfileURL()" target="_blank"
  :class="character.gender.toLowerCase()">
    {{character.name}}
  </a>
</template>

<style lang="stylus" scoped>
a
  font-weight: 700
  text-shadow: 0px 1px 2px rgba(black, 0.5)
  margin-right: -0.2em

.male
  color: hsl(210, 50%, 60%)

.female
  color: hsl(5, 90%, 78%)

.transgender
  color: hsl(35, 65%, 60%)

.herm
  color: hsl(266, 83%, 72%)

.shemale
  color: hsl(307, 63%, 72%)

.cunt-boy
  color: hsl(134, 56%, 60%)

.male-herm
  color: hsl(225, 100%, 66%)

.none
  color: hsl(54, 42%, 76%)
</style>

<script>
export default {
  props: {
    character: Object
  }
}
</script>
