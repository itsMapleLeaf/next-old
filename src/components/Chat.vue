<template>
  <div class='container'>
    <div class='row row-2'>
      <div class='col-2 fg-color'></div>
      <div class='grow'></div>
    </div>

    <div class='row row-6 fg-color'>test</div>

    <div class='divider'></div>

    <div class='row grow'>
      <div class='grow'>test</div>

      <div class='divider'></div>

      <div class='col-10 fg-color'>test</div>
    </div>

    <div class='divider'></div>

    <div class='row row-6 fg-color'>test</div>
  </div>
</template>

<style lang="stylus">
@import '../styles/base'
@import '../styles/variables'

.container
  position: fixed 0
  box: vertical

.row
  box: horizontal

for n in (1..10)
  .row-{n}
    height: (n)em

  .col-{n}
    width: (n)em

.grow
  box-item: flex-1

.divider
  size: 4px

.fg-color
  background: fg-color

.bg-color
  background: bg-color
</style>
