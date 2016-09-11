<template lang="pug">
.flex-column
  .color-main.flex-fixed.ui-padding-4
    user-header(:name='state.identity')
    menu-status-form
  .color-dark.flex-grow.ui-scroll-y.ui-divide-top
    active-room-list.color-main(:rooms="state.rooms", :current="state.currentRoom",
      @selected="setCurrentChat", @closed="closeRoom")
</template>

<script>
import UserHeader from './UserHeader.vue'
import MenuStatusForm from './MenuStatusForm.vue'
import ActiveRoomList from './ActiveRoomList.vue'
import UserMenuOptions from './UserMenuOptions.vue'
import {state, setCurrentChat} from '../store.new'

export default {
  components: {UserHeader, MenuStatusForm, ActiveRoomList, UserMenuOptions},

  data () {
    return {
      state
    }
  },

  methods: {
    setCurrentChat,
    closeRoom (room) {
      room.close()
    }
  }
}
</script>
