<template lang="jade">
.ui-overlay(@click.self='close')
  form.ui-panel.ui-height-12.ui-fit-viewport.flex-column.res.res-desktop.res-mobile-portrait(@submit.prevent='')
    .flex-grow.color-dark.ui-width-9.ui-fit-width.ui-margin-bottom-1.ui-scroll-y
      a.ui-block.ui-padding-3(href='#', v-for='channel in channels', :class="{ 'highlight-green': store.isChannelJoined(channel.id) }", @click='toggleChannel(channel.id)')
        .flex.flex-justify-space-between
          span(v-html='channel.name')
          span {{channel.users}}
        em.ui-text-small.ui-text-faded(v-if='channel.id !== channel.name')
          | {{channel.id}}
    .flex-fixed.ui-field.ui-input-icon-left.ui-block-center
      i.ui-icon.mdi.mdi-magnify
      input(type='text', v-model='searchText', placeholder='Search...')
    .flex-fixed.ui-field.ui-text-center
      checkbox(v-model='showAll') Show ALL channels (lag warning)
    back-button(@click.native='close')
  form.flex.ui-panel.ui-fit-viewport.flex.res.res-mobile-landscape(@submit.prevent='')
    .flex-grow.color-dark.ui-width-8.ui-scroll-y.ui-fit-height.ui-margin-left-2.ui-margin-right-2
      a.ui-block.ui-padding-3(href='#', v-for='channel in channels', :class="{ 'highlight-green': store.isChannelJoined(channel.id) }", @click='toggleChannel(channel.id)')
        .flex.flex-justify-space-between
          span(v-html='channel.name')
          span {{channel.users}}
        em.ui-text-small.ui-text-faded(v-if='channel.id !== channel.name')
          | {{channel.id}}
    .fiex-fixed.ui-margin-right-2.flex-column.flex-center
      .ui-field
        .ui-input-icon-left
          i.ui-icon.mdi.mdi-magnify
          input(type='text', v-model='searchText', placeholder='Search...')
      .ui-field
        checkbox(v-model='showAll') Show ALL channels (lag warning)
    back-button(align='middle', @click.native='close')
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
    },

    close () {
      this.store.popOverlay()
    }
  }
}
</script>
