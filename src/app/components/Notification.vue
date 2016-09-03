<template lang="pug">
transition(name='fade', appear)
  a.color-main.ui-width-8.ui-padding-4.ui-border.ui-shadow.ui-block(href='#')
    i.mdi.mdi-information-variant
    span {{ text }}
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>
