<template lang='jade'>
.color-dark
  a.ui-block.ui-padding-3.ui-transition(href='#', v-for='item in items', @click="$emit('input', item)", @focus="$emit('input', item)", :class="{ 'highlight-green': item === value }")
    | {{item}}
</template>

<script>
export default {
  props: {
    items: Array,
    value: String
  }
}
</script>
