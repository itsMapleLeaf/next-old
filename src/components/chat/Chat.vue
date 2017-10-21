<template>
  <main class="grid fullscreen bg-color-darken-2" @click="closeCharacterMenu" @contextmenu="activateCharacterMenu">
    <section class="actions bg-color-darken-2 scroll-v">
      <chat-action icon='forum' @click.native.prevent="openChannelList"></chat-action>
      <chat-action icon='account-multiple' @click.native.prevent="openCharacterBrowser"></chat-action>
    </section>

    <section class="tabs bg-color-darken-1 flex-column scroll-v">
      <renderer v-for="(tab, index) in tabs" :key="index" v-bind="tab.tab" :active="index === tabIndex" @activate="tabIndex = index" @close="tab.onClose"></renderer>
    </section>

    <section class="chat-view bg-color-darken-0 flex-grow">
      <renderer v-if="currentTab" v-bind="currentTab.view" class="fill-area"></renderer>
    </section>

    <renderer v-if="overlay" v-bind="overlay" @close="closeOverlay"></renderer>

    <channel-list-overlay v-if="isChannelListOpen" @close="isChannelListOpen = false" />

    <transition name="fade-in">
      <character-menu v-if="characterMenu" v-bind="characterMenu" @sendmessage="openPrivateChat"></character-menu>
    </transition>
  </main>
</template>

<script lang="ts">
import Vue from 'vue'

import store from '@/store'
import { Channel, PrivateChat } from '@/store/chat/models'

import ChannelListOverlay from './channel-list/ChannelListOverlay.vue'
import ChannelTab from './channel/ChannelTab.vue'
import ChannelView from './channel/ChannelView.vue'
import CharacterBrowser from './character-browser/CharacterBrowser.vue'
import CharacterMenu from './character/CharacterMenu.vue'
import ChatAction from './ChatAction.vue'
import PrivateChatTab from './private-chat/PrivateChatTab.vue'
import PrivateChatView from './private-chat/PrivateChatView.vue'

export default Vue.extend({
  components: {
    ChatAction,
    ChannelListOverlay,
    CharacterMenu,
  },

  data() {
    return {
      overlay: null as any,
      tabIndex: 0,
      characterMenu: null as null | { character: string; x: number; y: number },

      isChannelListOpen: false,
    }
  },

  computed: {
    joinedChannels(): Channel[] {
      return store.chat.channels.getJoinedChannels()
    },

    privateChats(): PrivateChat[] {
      return store.chat.privateChats.getOpenPrivateChats()
    },

    tabs(): any[] {
      const channelTabs = this.joinedChannels.map(channel => {
        return {
          tab: {
            component: ChannelTab,
            props: { channel },
          },
          view: {
            component: ChannelView,
            props: channel,
          },
          onClose: () => {
            store.chat.leaveChannel(channel.id)
          },
        }
      })

      const privateChatTabs = this.privateChats.map(privateChat => {
        return {
          tab: {
            component: PrivateChatTab,
            props: { privateChat },
          },
          view: {
            component: PrivateChatView,
            props: privateChat,
          },
          onClose: () => {
            store.chat.removePrivateChat(privateChat.partner)
          },
        }
      })

      return channelTabs.concat(privateChatTabs as any[])
    },

    currentTab(): any {
      return this.tabs[this.tabIndex]
    },
  },

  created() {
    this.createViews()
  },

  methods: {
    createViews() {
      this.characterBrowserView = {
        component: CharacterBrowser,
      }
    },

    openOverlay(overlay: any) {
      this.overlay = overlay
    },

    closeOverlay() {
      this.overlay = null
    },

    openChannelList() {
      this.isChannelListOpen = true
      store.chat.fetchChannelList()
    },

    openCharacterBrowser() {
      this.openOverlay(this.characterBrowserView)
    },

    closeCharacterMenu() {
      this.characterMenu = null
    },

    activateCharacterMenu(event: MouseEvent) {
      // this.characterMenu = null
      // const characterElement = event.path.find(el => el.dataset && el.dataset.character != null)
      // if (characterElement) {
      //   this.characterMenu = {
      //     character: characterElement.dataset.character,
      //     x: event.clientX,
      //     y: event.clientY,
      //   }
      //   event.preventDefault()
      // }
    },

    openPrivateChat(partner: string) {
      store.chat.openPrivateChat(partner)

      this.$nextTick(() => {
        const index = this.tabs.findIndex(
          tab =>
            tab.type === 'privateChat' && tab.privateChat.partner === partner,
        )
        if (index > -1) {
          this.tabIndex = index
        }
      })
    },
  },
})
</script>

<style lang="scss" scoped>
.action-icon {
  font-size: 200%;
  margin: 0.5rem;
  display: block;
  opacity: 0.5;

  &:hover {
    opacity: 0.75;
  }
}

.grid {
  display: grid;
  grid-template-rows: 100%;
  grid-template-columns: max-content 12rem auto;
  grid-gap: 4px;
  padding-left: 4px;
}
</style>
