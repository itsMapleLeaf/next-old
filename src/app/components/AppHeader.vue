<template lang="pug">
.flex-row.flex-justify-space-between.flex-align-center.ui-padding-2
  h1.ui-faded F-Chat Next {{ version }}
  div
    a.ui-link.ui-margin-left-1(href='#') About
    a.ui-link.ui-margin-left-1(href='#') Awesome
    a.ui-link.ui-margin-left-1(href='#') Links
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
