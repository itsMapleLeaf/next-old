<template lang='pug'>
div(@mouseleave='mouseleave')
  slot
</template>

<script>
export default {
  props: {
    left: Boolean,
    right: Boolean,
    top: Boolean,
    bottom: Boolean
  },
  data () {
    return {
      dragging: ''
    }
  },
  mounted () {
    window.addEventListener('mouseup', this.mouseup)
    window.addEventListener('mousedown', this.mousedown)
    window.addEventListener('mousemove', this.mousemove)
  },
  destroyed () {
    window.removeEventListener('mouseup', this.mouseup)
    window.removeEventListener('mousedown', this.mousedown)
    window.removeEventListener('mousemove', this.mousemove)
  },
  methods: {
    getSide (x, y) {
      const {top, right, bottom, left} = this.$el.getBoundingClientRect()
      switch (true) {
        case this.left && left < x && x < left + 10:
          return 'left'
        case this.right && right - 10 < x && x < right:
          return 'right'
        case this.top && top < y && y < top + 10:
          return 'top'
        case this.bottom && bottom - 10 < y && y < bottom:
          return 'bottom'
        default:
          return ''
      }
    },
    getCursor (side) {
      switch (side) {
        case 'top': return 'ns-resize'
        case 'bottom': return 'ns-resize'
        case 'left': return 'ew-resize'
        case 'right': return 'ew-resize'
        default: return 'default'
      }
    },
    getDraggedSize (x, y) {
      const {top, right, bottom, left, width, height} = this.$el.getBoundingClientRect()
      switch (this.dragging) {
        case 'left':
          return [right - x, height]
        case 'right':
          return [x - left, height]
        case 'top':
          return [width, bottom - y]
        case 'bottom':
          return [width, y - top]
        default:
          return [width, height]
      }
    },
    checkBounds (x, y) {
      const {top, right, bottom, left} = this.$el.getBoundingClientRect()
      return x >= left && x <= right && y >= top && y <= bottom
    },
    mousedown (event) {
      const {clientX, clientY} = event
      this.dragging = this.getSide(clientX, clientY)
      if (this.dragging) {
        event.preventDefault()
        event.stopPropagation()
      }
    },
    mouseup (event) {
      this.dragging = ''
    },
    mousemove (event) {
      const el = this.$el
      const {clientX, clientY} = event
      const {top, right, bottom, left} = el.getBoundingClientRect()

      const cursor = this.getCursor(this.dragging || this.getSide(clientX, clientY))
      const [width, height] = this.getDraggedSize(clientX, clientY)

      if (this.left || this.right) {
        el.style.width = width + 'px'
      }
      if (this.top || this.bottom) {
        el.style.height = height + 'px'
      }

      if (this.dragging || this.checkBounds(clientX, clientY)) {
        document.body.style.cursor = cursor
        event.preventDefault()
        event.stopPropagation()
      }
    },
    mouseleave () {
      document.body.style.cursor = 'default'
    }
  }
}
</script>
