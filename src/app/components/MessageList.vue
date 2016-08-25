<template lang="pug">
div(v-bottom-scroll='')
  message.ui-padding-1(v-for='msg in messages', :key='msg.id', :message='msg')
</template>

<script>
import Message from './Message.vue'
import Vue from 'vue'
import {bottomScroll} from '../directives'

export default {
  components: {Message},
  props: {
    messages: Array
  },
  directives: {
    bottomScroll
  }
}
</script>
