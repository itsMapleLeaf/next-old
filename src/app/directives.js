import Vue from 'vue'

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
    console.log('update', el.dataset.bottomScrollEnabled)
    if (el.dataset.bottomScrollEnabled === 'true') {
      Vue.nextTick(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  },
  unbind (el, binding) {
    el.removeEventListener('scroll', scrollToBottom)
  }
}

export { bottomScroll }
