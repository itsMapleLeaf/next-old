<template lang="pug">
mixin channel-list
  selection-option(v-for="ch of channels",
    :active="isChannelJoined(ch.id)", @input="toggleChannel(ch.id)")
      .flex.flex-justify-space-between
        span(v-html='ch.name')
        span {{ ch.users }}
      em.ui-text-small.ui-text-faded(v-if='ch.id !== ch.name')
        | {{ ch.id }}

mixin search-box
  .ui-input-icon-left
    i.ui-icon.mdi.mdi-magnify
    input(type='text', v-model='searchText', placeholder='Search...')

mixin show-all-channels
  checkbox(v-model='showAll') Show ALL channels (lag warning)

.ui-overlay(@click.self='close')
  form.ui-panel.ui-height-12.flex-column.res.res-desktop.res-mobile-portrait(@submit.prevent='')
    .flex-grow.color-dark.ui-width-9.ui-fit-width.ui-margin-bottom-1.ui-scroll-y
      +channel-list
    .flex-fixed.ui-field.ui-block-center
      +search-box
    .flex-fixed.ui-field.ui-text-center
      +show-all-channels
    back-button(@click.native='close')

  form.flex.ui-panel.flex.res.res-mobile-landscape(@submit.prevent='')
    .flex-grow.color-dark.ui-width-8.ui-scroll-y.ui-fit-height.ui-margin-left-2.ui-margin-right-2
      +channel-list
    .fiex-fixed.ui-margin-right-2.flex-column.flex-center
      .ui-field
        +search-box
      .ui-field
        +show-all-channels
    back-button(align='middle', @click.native='close')
</template>

<script>
import SelectionOption from './SelectionOption.vue'
import Checkbox from './Checkbox.vue'
import BackButton from './BackButton.vue'
import * as store from '../store'

const {isChannelJoined} = store

export default {
  components: {SelectionOption, Checkbox, BackButton},

  data () {
    return {
      searchText: '',
      showAll: false,
      state: store.state
    }
  },

  mounted () {
    store.requestChannels()
  },

  computed: {
    channels () {
      const pub = []
      const priv = []

      for (let ch of this.state.channels) {
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
    isChannelJoined,

    channelListHighlight (channel) {
      return { 'highlight-green': store.isChannelJoined(channel.id) }
    },

    toggleChannel (id) {
      if (!store.isChannelJoined(id)) {
        store.joinChannel(id)
      } else {
        store.leaveChannel(id)
      }
    },

    close () {
      store.popOverlay()
    }
  }
}
</script>
