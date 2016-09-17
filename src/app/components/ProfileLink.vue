<template>
  <a :href='href' target='_blank'>
    <slot>{{ name }}</slot>
  </a>
</template>

<script>
import {getProfileURL} from '../lib/f-list'

export default {
  props: {
    name: String
  },
  computed: {
    href () {
      return getProfileURL(this.name)
    }
  }
}
</script>
