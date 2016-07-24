<template>
  <div>
    <div v-for='message in messages' class='ui-padding-1'>
      {{message.sender}}: {{message.text}}
    </div>
  </div>
</template>

<script>
export default {
  props: {
    messages: Array
  }
}
</script>
