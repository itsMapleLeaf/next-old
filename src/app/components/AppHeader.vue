<template lang="pug">
mixin link(text)
  a.ui-link.ui-margin-left-1(href='#')= text

.flex-row.flex-justify-space-between.flex-align-center.ui-padding-2
  h1 F-Chat Next {{ version }}
  div
    +link('About')
    +link('Settings')
    +link('Help')
    +link('Feedback')
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
