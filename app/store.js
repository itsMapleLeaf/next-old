export const state = {
  overlays: []
}

export function pushOverlay (overlay) {
  state.overlays.push(overlay)
}

export function popOverlay (overlay) {
  state.overlays.pop()
}
