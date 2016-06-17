<template>
  <div class='grid'>
    <div class='row'>
      <a class='row-2 col-2 fg-color center-content app-menu-button' @click='setCurrentOverlay("app-menu")'>
        <i class='fa fa-bars'></i>
      </a>
      <div class='row grow' style='flex-wrap: wrap'>
        <chat-tab
          v-for='tab in tabs'
          :selected='selectedTabIndex === $index'
          @mousedown='selectedTabIndex = $index'>

          {{ tab.text }}
        </chat-tab>
      </div>
    </div>

    <div class='row row-6 fg-color padded overflow preserve-space'>
      {{ tabState.description }}
    </div>

    <div class='divider'></div>

    <div class='row grow'>
      <div class='grow padded overflow'>
        <div v-for='msg in tabState.messages' style="padding: 0.15em 0em">
          {{msg.character.name}}: {{{msg.message}}}
        </div>
      </div>

      <div class='divider'></div>

      <div class='col-10 fg-color padded overflow'>
        <div v-for='char in tabState.characters'>
          {{ char.name }}
        </div>
      </div>
    </div>

    <div class='divider'></div>

    <div class='row row-6 fg-color'>
      <chatbox></chatbox>
    </div>
  </div>
</template>

<script>
import Chatbox from './Chatbox.vue'
import ChatTab from './ChatTab.vue'
import {ChannelState} from '../models'
import {joinedChannels} from '../vuex/getters'
import {setCurrentOverlay} from '../vuex/actions'

const nullChannel = ChannelState('null', 'null')

export default {
  components: {
    Chatbox,
    ChatTab
  },

  data () {
    return {
      selectedTabIndex: 0
    }
  },

  computed: {
    tabs () {
      return this.joinedChannels.map(channel => {
        return {
          text: channel.name,
          state: channel
        }
      })
    },

    tabState () {
      return this.tabs[this.selectedTabIndex].state
    }
  },

  vuex: {
    getters: {
      joinedChannels
    },
    actions: {
      setCurrentOverlay
    }
  }
}
</script>

<style lang="stylus" scoped>
@require '../styles/grid'
@require '../styles/components'

.padded
  padding: 0.5em 0.7em

.app-menu-button
  +transition(hover)
    background: lighten(fg-color, 10%)
    cursor: pointer
</style>
