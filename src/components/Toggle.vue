<script>
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ToggleComponent from './Toggle'

export default {
  methods: {
    updateReact() {
      ReactDOM.render(
        React.createElement(
          ToggleComponent,
          this.$attrs,
          this.$slots.default.map(vnode => vnode.text || '')
        ),
        this.$refs.reactRoot
      )
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.updateReact()
    })
  },
  updated() {
    this.updateReact()
  },
  render(h) {
    return h('div', { ref: 'reactRoot' })
  }
}
</script>
