<template>
  <div class='box fg-color header scroll'>
    <slot name='header'></slot>
  </div>

  <div class='box divider'></div>

  <div class='box box-horizontal box-item-grow'>
    <div class='box box-item-grow scroll content'>
      <slot name='content'></slot>
    </div>

    <div class='box divider'></div>

    <div class='box fg-color scroll sidebar'>
      <slot name='sidebar'></slot>
    </div>
  </div>

  <div class='divider'></div>
</template>

<style lang="stylus">
.header
  height: 5em

.sidebar
  width: 10em
</style>
