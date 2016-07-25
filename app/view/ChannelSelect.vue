<template>
  <div class='ui-overlay'>
    <div class='ui-panel'>
      <form>
        <div class='ui-margin-1 ui-width-7 ui-height-12 color-dark ui-scroll-y'>
          <a href='#' v-for='channel in channels'
            class='ui-block ui-padding-3'
            :class="{ 'highlight-green': store.isChannelJoined(channel.id) }"
            @click='toggleChannel(channel.id)'>
            <div class='flex flex-justify-space-between'>
              <span v-html='channel.name'></span>
              <span>{{channel.users}}</span>
            </div>
            <em class='ui-text-small ui-text-faded' v-if='channel.id !== channel.name'>
              {{channel.id}}
            </em>
          </a>
        </div>
        <div class='ui-margin-1 ui-input-icon-left ui-block-center'>
          <i class='ui-icon mdi mdi-magnify'></i>
          <input type='text' v-model='searchText' placeholder='Search...' />
        </div>
        <div class='ui-margin-1 ui-text-center'>
          <checkbox v-model='showAll'>Show ALL channels (lag warning)</checkbox>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import Checkbox from './Checkbox.vue'
import store from '../store'
import socket from '../socket'

export default {
  components: {SelectionList, Checkbox},

  data () {
    return {
      searchText: '',
      showAll: false,
      store
    }
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
        .filter(ch => ch.name.toLocaleLowerCase()
          .includes(this.searchText.toLocaleLowerCase()))
        .slice(0, this.showAll ? undefined : 200)
    }
  },

  methods: {
    toggleChannel (id) {
      if (!this.store.isChannelJoined(id)) {
        socket.joinChannel(id)
      } else {
        socket.leaveChannel(id)
      }

    }
  }
}
</script>
