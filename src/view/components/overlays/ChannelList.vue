<template>
  <overlay>
    <h2>Chill and chat? Sounds good.</h2>
    <form class='ui form'>
      <section class='ui field'>
        <ul class='ui selection'>
          <li v-for='channel in filter(publicChannels)'
            class="ui noselect" :class="{ 'active': isJoined(channel.id) }">
            <span class='ui pull right'>{{channel.userCount}}</span>
            <span v-html="channel.name"></span>
          </li>
          <li v-for='channel in filter(privateChannels)'
            class="ui noselect" :class="{ 'active': isJoined(channel.id) }">
            <span class='ui pull right'>{{channel.userCount}}</span>
            <span v-html="channel.name"></span><br />
            <em class="ui small subtle">{{channel.id}}</em>
          </li>
        </ul>
      </section>

      <section class='ui field text-input icon left'>
        <i class='fa fa-search'></i>
        <input type="text" placeholder="Search..." v-model='search'>
      </section>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
.selection
  text-align: left
  width: 18em
  height: 28em

  li
    padding-left: 0.8em
    padding-right: 0.8em

    span
      pointer-events: none
</style>

<script>
import Overlay from '../elements/Overlay.vue'
import {store} from 'modules/store'
import {socket} from 'modules/socket'

function compareChannelInfo (a, b) {
  return a.name.localeCompare(b.name)
}

export default {
  data () {
    return {
      search: '',
      publicChannels: [],
      privateChannels: [],
      state: store.state
    }
  },

  async created () {
    store.notify('PushOverlay', { overlay: 'loading' })
    await socket.requestChannels()
    store.notify('PopOverlay')

    this.publicChannels = store.getPublicChannelList().sort(compareChannelInfo)
    this.privateChannels = store.getPrivateChannelList().sort(compareChannelInfo)
  },

  components: {
    Overlay
  },

  methods: {
    filter (channels) {
      return channels.filter(ch => ch.name.includes(this.search)).slice(0, 200)
    },

    isJoined (id) {
      return store.isChannelActive(id)
    }
  }
}
</script>
