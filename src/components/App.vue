<template>
  <main class="fullscreen bg-color-main text-color-main">
    <Chat />
    <Login v-if="view === 'login'" @submit="handleLoginSubmit" />
    <CharacterSelect v-if="view === 'characterSelect'" @submit="handleCharacterSubmit" />
  </main>
</template>

<script lang="ts" src="./App.ts"></script>
