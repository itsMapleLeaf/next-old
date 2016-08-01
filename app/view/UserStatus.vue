<template lang='jade'>
span
  span.status-color(:class='status') {{ status }}
  span(v-html="' - ' + statusmsg", v-if='statusmsg')
</template>

<script>
export default {
  props: {
    status: String,
    statusmsg: String
  }
}
</script>
