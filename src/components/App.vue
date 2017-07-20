<template>
  <div>
    <fade v-for="(overlay, i) in overlays" :key="i">
      <overlay>
        <login v-if="overlay === 'login'" @submit="handleLoginSubmit" :status="loginStatus"></login>
        <character-select v-if="overlay === 'characterSelect'" :characters="store.user.characters" @submit="handleIdentitySubmit"></character-select>
      </overlay>
    </fade>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
