// @flow

function scrollToBottom (event) {
  const el = event.target
  el.dataset.bottomScrollEnabled = el.scrollHeight - el.scrollTop === el.clientHeight
}

export const bottomScroll = {
  bind (el: any, binding: any) {
    el.dataset.bottomScrollEnabled = true
    el.addEventListener('scroll', scrollToBottom)
  },
  update (el: any, binding: any) {
    if (el.dataset.bottomScrollEnabled) {
      window.requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  },
  unbind (el: any, binding: any) {
    el.removeEventListener('scroll', scrollToBottom)
  }
}
