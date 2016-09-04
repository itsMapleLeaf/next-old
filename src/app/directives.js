// import Vue from 'vue'

function scrollToBottom (event) {
  const el = event.target
  el.dataset.bottomScrollEnabled = el.scrollHeight - el.scrollTop === el.clientHeight
}

const bottomScroll = {
  bind (el, binding) {
    el.dataset.bottomScrollEnabled = 'true'
    el.addEventListener('scroll', scrollToBottom)
  },
  update (el, binding) {
    if (el.dataset.bottomScrollEnabled === 'true') {
      window.requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  },
  unbind (el, binding) {
    el.removeEventListener('scroll', scrollToBottom)
  }
}

export { bottomScroll }
