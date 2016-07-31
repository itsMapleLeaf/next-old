<template>
  <div class='color-dark flex-column'>
    <template v-if='room != null'>
      <div class='flex-fixed color-main ui-padding-2 ui-scroll-y res res-desktop'
        style='height: 4rem'>
        <span class='ui-pre-wrap' v-if='isChannelRoom' v-html='room.description'></span>
        <span v-if='isPrivateRoom'>
          <character
            :character='room.partner'>
          </character>
          - <user-status
            :status='room.partner.status'
            :statusmsg='room.partner.statusmsg'>
          </user-status>
        </span>
      </div>
      <div class='flex-grow flex flex-align-stretch ui-divide-top ui-divide-bottom'>
        <messages
          class='flex-grow ui-scroll-y'
          :messages='room.messages'>
        </messages>
        <users v-if='isChannelRoom'
          class='flex-fixed ui-width-6 color-main ui-scroll-y ui-divide-left res res-desktop'
          :users='room.characters'>
        </users>
      </div>
      <textarea
        class='flex-fixed color-main ui-block ui-padding-2'
        style='height: 4rem'
        :placeholder="'Chatting as ' + store.identity + '...'">
      </textarea>
    </template>
  </div>
</template>

<script>
import Description from './RoomDescription.vue'
import Users from './UserList.vue'
import Messages from './MessageList.vue'
import Chatbox from './Chatbox.vue'
import Character from './Character.vue'
import UserStatus from './UserStatus.vue'
import ChannelRoom from '../models/ChannelRoom'
import PrivateRoom from '../models/PrivateRoom'
import store from '../store'

export default {
  components: {Description, Users, Messages, Chatbox, Character, UserStatus},

  data () {
    return {
      store
    }
  },

  computed: {
    room () {
      return this.store.getCurrentRoom()
    },

    isChannelRoom () {
      return this.room instanceof ChannelRoom
    },

    isPrivateRoom () {
      return this.room instanceof PrivateRoom
    }
  }
}
</script>
