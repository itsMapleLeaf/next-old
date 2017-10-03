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

    <transition name="fade-in">
      <character-menu v-if="characterMenu" v-bind="characterMenu" @sendmessage="openPrivateChat"></character-menu>
    </transition>
  </main>
</template>

<script>
import ChatAction from './ChatAction.vue'
import ChatTab from './ChatTab.vue'
import ChannelView from './ChannelView.vue'
import PrivateChatView from './PrivateChatView.vue'
import ChannelList from './ChannelList.vue'
import CharacterBrowser from './CharacterBrowser.vue'
import CharacterMenu from './CharacterMenu.vue'

export default {
  components: {
    ChatAction,
    ChannelList,
    ChatTab,
    ChannelView,
    PrivateChatView,
    CharacterMenu,
  },
  data() {
    return {
      overlay: null,
      tabIndex: 0,
      characterMenu: null,
    }
  },
  computed: {
    joinedChannels() {
      const { chat } = this.$store.state
      return Object.keys(chat.joinedChannels).map(id => chat.channels[id])
    },
    privateChats() {
      const { chat } = this.$store.state
      return Object.values(chat.privateChats)
    },
    tabs() {
      const channelTabs = this.joinedChannels.map(channel => {
        return {
          tab: {
            component: require('./ChannelTab.vue'),
            props: { channel }
          },
          view: {
            component: require('./ChannelView.vue'),
            props: channel
          },
          onClose: () => {
            this.$store.dispatch('leaveChannel', channel.id)
          }
        }
      })

      const privateChatTabs = this.privateChats.map(privateChat => {
        return {
          tab: {
            component: require('./PrivateChatTab.vue'),
            props: { privateChat }
          },
          view: {
            component: require('./PrivateChatView.vue'),
            props: privateChat
          },
          onClose: () => {
            this.$store.commit('REMOVE_PRIVATE_CHAT', privateChat.partner)
          }
        }
      })

      return channelTabs.concat(privateChatTabs)
    },
    currentTab() {
      return this.tabs[this.tabIndex]
    }
  },
  created() {
    this.createViews()
  },
  methods: {
    createViews() {
      this.channelListView = {
        component: ChannelList,
      }

      this.characterBrowserView = {
        component: CharacterBrowser
      }
    },

    openOverlay(overlay) {
      this.overlay = overlay
    },

    closeOverlay() {
      this.overlay = null
    },

    openChannelList() {
      this.openOverlay(this.channelListView)
      this.$store.dispatch('fetchChannelList')
    },

    openCharacterBrowser() {
      this.openOverlay(this.characterBrowserView)
    },

    closeCharacterMenu() {
      this.characterMenu = null
    },

    activateCharacterMenu(event) {
      this.characterMenu = null

      const characterElement = event.path.find(el => el.dataset && el.dataset.character != null)
      if (characterElement) {
        this.characterMenu = {
          character: characterElement.dataset.character,
          x: event.clientX,
          y: event.clientY,
        }
        event.preventDefault()
      }
    },

    openPrivateChat(partner) {
      this.$store.dispatch('openPrivateChat', partner)

      this.$nextTick(() => {
        const index = this.tabs.findIndex(tab =>
          tab.type === 'privateChat' && tab.privateChat.partner === partner
        )
        if (index > -1) {
          this.tabIndex = index
        }
      })
    }
  },
}
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
