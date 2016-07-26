<template>
  <div class='ui-overlay'>
    <form class='ui-panel ui-height-12 ui-fit-viewport flex-column res res-desktop res-mobile-portrait' @submit.prevent>
      <div class='flex-grow color-dark ui-width-9 ui-fit-width ui-margin-bottom-1 ui-scroll-y'>
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
      <div class='flex-fixed ui-field ui-input-icon-left ui-block-center'>
        <i class='ui-icon mdi mdi-magnify'></i>
        <input type='text' v-model='searchText' placeholder='Search...' />
      </div>
      <div class='flex-fixed ui-field ui-text-center'>
        <checkbox v-model='showAll'>Show ALL channels (lag warning)</checkbox>
      </div>
      <back-button></back-button>
    </form>

    <form class='flex ui-panel ui-fit-viewport flex res res-mobile-landscape' @submit.prevent>
      <div class='flex-grow color-dark ui-width-8 ui-scroll-y ui-fit-height ui-margin-left-2 ui-margin-right-2'>
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
      <div class='fiex-fixed ui-margin-right-2 flex-column flex-center'>
        <div class='ui-field'>
          <div class='ui-input-icon-left'>
            <i class='ui-icon mdi mdi-magnify'></i>
            <input type='text' v-model='searchText' placeholder='Search...' />
          </div>
        </div>
        <div class='ui-field'>
          <checkbox v-model='showAll'>Show ALL channels (lag warning)</checkbox>
        </div>
      </div>
      <back-button align='middle'></back-button>
    </form>
  </div>
</template>

<script>
import SelectionList from './SelectionList.vue'
import Checkbox from './Checkbox.vue'
import BackButton from './BackButton.vue'
import store from '../store'
import socket from '../socket'

export default {
  components: {SelectionList, Checkbox, BackButton},

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
