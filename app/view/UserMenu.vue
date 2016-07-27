<template>
  <div class='ui-overlay'>
    <div class='ui-panel-left ui-width-6 flex-column ui-scroll-y'>
      <section class='flex-fixed ui-padding-5'>
        <header class='ui-margin-bottom-1'>
          <h2>Hi, Trance.</h2>
          <small class='ui-faded'>In the mood for some play?</small>
        </header>
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
        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-earth'></i> Frontpage</a>
        <a href='#' class='ui-block ui-padding-4 highlight-blue'><i class='mdi mdi-earth'></i> Fantasy</a>

        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-key-variant'></i> Furry Femboys</a>

        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-heart'></i> Lyara Silverwing</a>

        <div class='ui-padding-1 color-darker'></div>

        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-forum'></i> Channels</a>
        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-heart'></i> Online Users</a>
        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-settings'></i> Settings</a>
        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-logout'></i> Log Out</a>
        <a href='#' class='ui-block ui-padding-4'><i class='mdi mdi-account-switch'></i> Change Character</a>
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
