<template>
  <div class='header box fg-color scroll'>
    <slot name='header'></slot>
  </div>

  <div class='box divider'></div>

  <div class='box horizontal grow'>
    <div class='box grow scroll'>
      <slot name='content'></slot>
    </div>

    <div class='sidebar box fg-color scroll'>
      <slot name='sidebar'></slot>
    </div>
  </div>

  <div class='box divider'></div>
</template>

<style lang="stylus">
.header
  height: 5em

.sidebar
  width: 12em
</style>
