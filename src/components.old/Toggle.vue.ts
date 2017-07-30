import * as Vue from 'vue'
import * as React from 'react'
import * as ReactDOM from 'react-dom'
import ToggleComponent from '../components/Toggle'

interface Toggle extends Vue {
  updateReact(): void
}

export default {
  methods: {
    updateReact() {
      ReactDOM.render(
        React.createElement(
          ToggleComponent,
          this.$attrs || {},
          this.$slots.default.map(vnode => vnode.text || ''),
        ),
        this.$refs.reactRoot as Element,
      )
    },
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
  },
} as Vue.ComponentOptions<Toggle>
