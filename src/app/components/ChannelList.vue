<template>
  <Overlay header='Channel List' @closed="$emit('closed')">
    <form @submit.prevent>
      <fieldset>
        <div class='selection-list'>
          <a href='#' v-for='ch in publicChannels' @click="$emit('channel-toggled', ch)">
            <i class='mdi mdi-earth'></i>
            <span class='channel-user-count'>{{ ch.userCount }}</span>
            <span class='channel-name'>{{ ch.name }}</span>
          </a>
          <a href='#' v-for='ch in privateChannels' @click="$emit('channel-toggled', ch)">
            <div>
              <i class='mdi mdi-key-variant'></i>
              <span class='channel-user-count'>{{ ch.userCount }}</span>
              <span class='channel-name' v-html='ch.name'></span>
            </div>
            <small class='channel-id'>{{ ch.id }}</small>
          </a>
        </div>
      </fieldset>
      <fieldset>
        <div class='icon-input'>
          <i class='mdi mdi-magnify'></i>
          <input type='text' placeholder='Search...' v-model='searchText'>
        </div>
      </fieldset>
    </form>
  </Overlay>
</template>

<script>
import Overlay from './Overlay.vue'
import {store, getters} from '../store'

export default {
  components: {
    Overlay
  },
  created () {
    store.fetchChannelList()
  },
  data () {
    return {
      searchText: ''
    }
  },
  computed: {
    ...getters(['publicChannelList', 'privateChannelList']),

    publicChannels () {
      return this.publicChannelList
        .filter(ch => ch.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()))
        .sort((a, b) => b.userCount - a.userCount)
    },

    privateChannels () {
      return this.privateChannelList
        .filter(ch => ch.name.toLocaleLowerCase().includes(this.searchText.toLocaleLowerCase()))
        .sort((a, b) => b.userCount - a.userCount)
        .slice(0, 200)
    }
  }
}
</script>

<style lang='stylus' scoped>
@require '../styles/colors'

form
  text-align: center

.selection-list
  text-align: left
  width: 18em
  height: calc(100vh - 14em)

.channel-user-count
  float: right

.channel-id
  margin-left: 1.3rem
  color: lighten($theme-color, 25%)
</style>
