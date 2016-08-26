<template lang="pug">
mixin icon-link(icon)
  a.ui-margin-right-1(href='#', style="font-size: 1.25em")
    i.mdi(class='mdi-' + icon)

.flex-row.flex-justify-space-between.flex-align-center.flex-wrap.ui-padding-2
  h1.flex-fixed F-Chat Next
    small.ui-faded  v{{ version }}
  div
    +icon-link('bell')
    +icon-link('settings')
    +icon-link('account')
</template>

<script>
import {version} from '../../../package.json'

export default {
  data () {
    return {
      version
    }
  }
}
</script>
