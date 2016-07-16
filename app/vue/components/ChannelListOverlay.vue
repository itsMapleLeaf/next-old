<template>
  <overlay>
    <h2>Chill and chat? Sounds good.</h2>
    <form>
      <fieldset>
        <selection-list class="channels">
          <li v-for="channel in filter(publicChannels)"
            class="no-select" :active="isJoined(channel.id)"
            :data-toggle-channel="channel.id">
            <span class='pull-right'>{{channel.userCount}}</span>
            <span v-html="channel.name"></span>
          </li>
          <li v-for="channel in filter(privateChannels)"
            class="no-select" :active="isJoined(channel.id)"
            :data-toggle-channel="channel.id">
            <span class="pull-right">{{channel.userCount}}</span>
            <span v-html="channel.name"></span><br />
            <em class="ui-small ui-subtle">{{channel.id}}</em>
          </li>
        </selection-list>
      </fieldset>
      <fieldset class="ui-icon-left" style="width: min-content">
        <i class="mdi mdi-search"></i>
        <input type="text" placeholder="Search..." v-model="search">
      </fieldset>
    </form>
  </overlay>
</template>

<style lang="stylus" scoped>
.channels
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
import SelectionList from '../elements/SelectionList.vue'
import {socket} from 'modules/socket'
import {pushOverlay, popOverlay} from '../../vuex/actions'

function compareChannelInfo (a, b) {
  return a.name.localeCompare(b.name)
}

export default {
  components: { Overlay, SelectionList },

  data () {
    return {
      search: ''
    }
  },

  vuex: {
    getters: {
      publicChannels: state => state.chat.publicChannels,
      privateChannels: state => state.chat.privateChannels
    },
    setters: {pushOverlay, popOverlay}
  },

  created () {
    this.pushOverlay('loading')
    socket.requestChannels().then(this.popOverlay)
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
