<template>
  <div class='ui-overlay'>
    <div class='ui-panel-left ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <h2 class='ui-margin-bottom-1'>Hi, Trance.</h2>
        <span class='ui-margin-v-1'>
          <avatar name="Trance-"></avatar>
        </span>
        <div class='ui-input-icon-right ui-fit-width ui-margin-top-1'>
          <i class='ui-icon mdi mdi-chevron-down'></i>
          <input type='text' placeholder='Status dropdown' />
        </div>
        <div class='ui-input-icon-right ui-fit-width ui-margin-top-1'>
          <i class='ui-icon mdi mdi-pencil'></i>
          <input type='text' placeholder='Status...' />
        </div>
      </section>
      <section class='flex-grow color-dark'>
        <a class='ui-block ui-padding-4' href='#'><i class='mdi mdi-forum'></i> Channels</a>
        <a class='ui-block ui-padding-4' href='#'><i class='mdi mdi-heart'></i> Online Users</a>
        <a class='ui-block ui-padding-4' href='#'><i class='mdi mdi-settings'></i> Settings</a>
        <a class='ui-block ui-padding-4' href='#'><i class='mdi mdi-logout'></i> Log Out</a>
        <a class='ui-block ui-padding-4' href='#'><i class='mdi mdi-account-switch'></i> Change Character</a>
      </section>
    </div>
  </div>
</template>

<script>
import Avatar from './CharacterAvatarLink.vue'

export default {
  components: {Avatar}
}
</script>
