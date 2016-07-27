<template>
  <div>
    <div v-for='message in messages' class='ui-padding-1'>
      <strong :class="'gender-color ' + message.sender.gender" style='margin-right: 0.5rem'>
        {{message.sender.name}}
      </strong>
      <span v-html='message.message'></span>
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
