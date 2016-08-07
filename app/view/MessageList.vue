<template lang="jade">
div(v-bottom-scroll='')
  message.ui-padding-1(v-for='msg in messages', :key='msg.id', :message='msg')
</template>

<script>
import Message from './Message.vue'
import Vue from 'vue'

export default {
  components: {Message},

  props: {
    messages: Array
  },

  directives: {
    bottomScroll: {
      bind (el, binding) {
        el.dataset.bottomScrollEnabled = 'true'
        el.addEventListener('scroll', () => {
          el.dataset.bottomScrollEnabled = el.scrollHeight - el.scrollTop === el.clientHeight
          console.log('scroll', el.dataset.bottomScrollEnabled)
        })
      },
      update (el, binding) {
        console.log('update', el.dataset.bottomScrollEnabled)
        if (el.dataset.bottomScrollEnabled === 'true') {
          Vue.nextTick(() => {
            el.scrollTop = el.scrollHeight
          })
        }
      },
      unbind (el, binding) {
        el.removeEventListener('scroll')
      }
    }
  }
}
</script>
