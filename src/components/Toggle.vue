<template>
  <div ref="reactRoot">
  </div>
</template>

<script>
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ToggleComponent from './Toggle'

export default {
  updated() {
    ReactDOM.render(
      React.createElement(ToggleComponent, {}, this.$slots.default.map(vnode => vnode.text || '')),
      this.$refs.reactRoot
    )
  }
}
</script>
