<template>
  <div class='color-dark ui-scroll-y'>
    <a href='#'
      v-for='item in items'
      @click="$emit('input', item)"
      class='ui-block ui-padding-3'
      :class="{ 'highlight-green': item === value }">
      {{item}}
    </a>
  </div>
</template>

<script>
export default {
  props: {
    items: Array,
    value: String
  }
}
</script>
