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

import ChatAction from './ChatAction.vue'
import ChatTab from './ChatTab.vue'
import ChannelView from './ChannelView.vue'
import PrivateChatView from './PrivateChatView.vue'
import ChannelListOverlay from './channel-list/ChannelListOverlay.vue'
import CharacterBrowser from './CharacterBrowser.vue'
import CharacterMenu from './CharacterMenu.vue'

export default Vue.extend({
  components: {
    ChatAction,
    ChannelListOverlay,
    ChatTab,
    ChannelView,
    PrivateChatView,
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
      const channelStore = store.chat.channels
      return channelStore
        .getJoinedChannels()
        .map(id => channelStore.getChannel(id))
    },

    privateChats(): PrivateChat[] {
      const privateChatStore = store.chat.privateChats
      return privateChatStore
        .getOpenPrivateChats()
        .map(partner => privateChatStore.getPrivateChat(partner))
    },

    tabs(): any[] {
      const channelTabs = this.joinedChannels.map(channel => {
        return {
          tab: {
            component: require('./ChannelTab.vue').default,
            props: { channel } as any,
          },
          view: {
            component: require('./ChannelView.vue').default,
            props: channel as any,
          },
          onClose: () => {
            store.chat.leaveChannel(channel.id)
          },
        }
      })

      const privateChatTabs = this.privateChats.map(privateChat => {
        return {
          tab: {
            component: require('./PrivateChatTab.vue').default,
            props: { privateChat } as any,
          },
          view: {
            component: require('./PrivateChatView.vue').default,
            props: privateChat as any,
          },
          onClose: () => {
            store.chat.removePrivateChat(privateChat.partner)
          },
        }
      })

      return channelTabs.concat(privateChatTabs)
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
