<template>
  <div class='chat ui-fullscreen ui-color-dark flex-column'>
    <div class='flex-fixed ui-height-1'>test</div>
    <div class='flex-fixed ui-height-2'>test</div>
    <div class='flex-grow flex flex-align-stretch'>
      <div class='flex-grow ui-scroll-y'>
        <span v-for='i in 100'>fuck<br /></span>
      </div>
      <div class='ui-width-3 ui-scroll-y'>
        <span v-for='i in 100'>fuck<br /></span>
      </div>
    </div>
    <div class='flex-fixed ui-height-2'>test</div>
  </div>
</template>

<style scoped>
</style>
