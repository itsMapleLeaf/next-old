<template>
  <div class='flex'>
    <a href='#' v-for='(index, tab) in tabs'
      class='flex-grow ui-padding-2 ui-max-width-2'
      :class="{ 'ui-color-main': index === active }">
      <span>{{tab.title}}</span>
    </a>
  </div>
</template>

<script>
export default {
  props: {
    tabs: Array,
    active: Number
  }
}
</script>
