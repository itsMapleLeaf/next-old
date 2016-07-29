<template>
  <span>
    <span class='status-color' :class='status'>{{ status }}</span>
    <span v-html="' - ' + statusmsg" v-if='statusmsg'></span>
  </span>
</template>

<script>
export default {
  props: {
    status: String,
    statusmsg: String
  }
}
</script>
