// @flow

function scrollToBottom (event) {
  const el = event.target
  el.dataset.bottomScrollEnabled = el.scrollHeight - el.scrollTop === el.clientHeight
}

const bottomScroll = {
  bind (el: Object, binding: Object) {
    el.dataset.bottomScrollEnabled = 'true'
    el.addEventListener('scroll', scrollToBottom)
  },
  update (el: Object, binding: Object) {
    if (el.dataset.bottomScrollEnabled === 'true') {
      window.requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  },
  unbind (el: Object, binding: Object) {
    el.removeEventListener('scroll', scrollToBottom)
  }
}

export { bottomScroll }
