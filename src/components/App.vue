<template>
  <div>
    <fade v-for="(overlay, i) in overlays" :key="i">
      <overlay>
        <login v-if="overlay === 'login'" @submit="handleLoginSubmit" :status="loginStatus" class="text-center"></login>
        <character-select v-if="overlay === 'characterSelect'" :characters="store.user.characters" @submit="handleIdentitySubmit" class="text-center" style="padding: 0 1em 1em"></character-select>
      </overlay>
    </fade>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
