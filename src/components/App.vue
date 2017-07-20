<template>
  <div class="fullscreen flex-row">
    <div class="bg-color-darkest flex-column">
      <div class="flex-grow">
        <a class="action" href="#">
          <i class="mdi mdi-account-circle"></i>
        </a>
        <a class="action" href="#">
          <i class="mdi mdi-forum"></i>
        </a>
        <a class="action" href="#">
          <i class="mdi mdi-account-multiple"></i>
        </a>
        <a class="action" href="#">
          <i class="mdi mdi-settings"></i>
        </a>
      </div>
      <div>
        <a class="action" href="#">
          <i class="mdi mdi-logout"></i>
        </a>
      </div>
    </div>
  
    <fade v-for="(overlay, i) in overlays" :key="i">
      <overlay>
        <login v-if="overlay === 'login'" @submit="handleLoginSubmit" :status="loginStatus"
          class="text-center">
        </login>
        <character-select v-if="overlay === 'characterSelect'" :characters="store.user.characters"
          @submit="handleIdentitySubmit" class="text-center" style="padding: 0 1em 1em">
        </character-select>
      </overlay>
    </fade>
  </div>
</template>

<style scoped>
.action {
  display: block;
  opacity: 0.5;
  font-size: 28px;
  margin: 0.5rem;
}

.action:hover {
  opacity: 0.75;
}
</style>

<script lang="ts" src="./App.ts"></script>
