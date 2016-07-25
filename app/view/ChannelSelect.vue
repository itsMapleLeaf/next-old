<template>
  <div class='ui-overlay'>
    <div class='ui-panel'>
      <form>
        <div class='ui-margin-1 ui-width-8 ui-height-12 color-dark ui-scroll-y'>
          <a href='#' v-for='channel in channels' class='ui-block ui-padding-3'>
            <div class='flex flex-justify-space-between'>
              <span>{{channel.name}}</span>
              <span>{{channel.users}}</span>
            </div>
            <em class='ui-text-small ui-faded' v-if='channel.id !== channel.name'>
              {{channel.id}}
            </em>
          </a>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import store from '../store'
import socket from '../socket'

export default {
  components: {SelectionList},

  data () {
    return { store }
  },

  mounted () {
    socket.requestChannels()
  },

  computed: {
    channels () {
      const pub = []
      const priv = []

      for (let ch of this.store.channels) {
        if (ch.name === ch.id) {
          pub.push(ch)
        } else {
          priv.push(ch)
        }
      }

      pub.sort((a, b) => a.name.localeCompare(b.name))
      priv.sort((a, b) => a.name.localeCompare(b.name))
      return pub.concat(priv)
    }
  }
}
</script>
