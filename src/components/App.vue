<template>
  <div>
    <overlay v-for="(overlay, i) in overlays" :key="i">
      <login v-if="overlay === 'login'" @submit="handleLoginSubmit" :status="loginStatus"></login>
      <character-select v-if="overlay === 'characterSelect'" :characters="store.userCharacters" @submit="handleIdentitySubmit"></character-select>
    </overlay>
  </div>
</template>

<script lang="ts" src="./App.ts"></script>
