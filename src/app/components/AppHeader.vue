<template lang="pug">
.flex-row.flex-justify-space-between.flex-align-center
  h1 F-Chat Next {{ version }}
  div
    a.ui-link.ui-margin-right-1(href='#') Some
    a.ui-link.ui-margin-right-1(href='#') Awesome
    a.ui-link.ui-margin-right-1(href='#') Links
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
