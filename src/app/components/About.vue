<template lang="pug">
.ui-overlay(@click.self="popOverlay")
  .ui-panel.ui-padding-8
    .ui-width-8.ui-fit-width.ui-text-center
      h1 F-Chat Next v{{ version }}
      p
        i.mdi.mdi-code-tags
        |  with
        i.mdi.mdi-heart
        |  by
        a.ui-link(href="https://www.f-list.net/c/alexander%20grapevine/", target="_blank").
          an adorable fluffy kitten.
      p
        a.ui-link(href="https://github.com/kingdaro/fchat", target="_blank").
          View on GitHub
      p.
        Note: this is a super early beta!
        There will probably be a few bugs, and some missing functionality.
      p.
        Make an issue on GitHub or send me a note on F-List if you have any questions, ideas,
        or bug reports.
    a.ui-anchor-right.ui-anchor-top.ui-padding-subtle.ui-faded(href='#', @click="popOverlay")
      i.mdi.mdi-close
</template>

<script>
import {popOverlay} from '../store'
import {version} from '../../../package.json'

export default {
  data () {
    return {version}
  },
  methods: {
    popOverlay
  }
}
</script>
