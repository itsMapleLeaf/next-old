<template>
  <main class="fullscreen bg-color-main text-color-main">
    <chat></chat>
    <renderer v-if="view" v-bind="view"></renderer>
  </main>
</template>

<script lang="ts" src="./App.ts"></script>
