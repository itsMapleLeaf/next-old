export default {
  overlays: [],
  pushOverlay (overlay) {
    this.overlays.push(overlay)
  },
  popOverlay () {
    this.overlays.pop()
  }
}
