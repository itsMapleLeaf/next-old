import * as Vue from 'vue'

function scrollToBottom(event) {
  const el = event.target
  el.dataset.bottomScrollEnabled =
    el.scrollHeight - el.scrollTop === el.clientHeight ? 'true' : 'false'
}

export const bottomScroll: Vue.DirectiveOptions = {
  bind(el) {
    el.dataset.bottomScrollEnabled = 'true'
    el.addEventListener('scroll', scrollToBottom)
  },
  update(el) {
    if (el.dataset.bottomScrollEnabled === 'true') {
      window.requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  },
  unbind(el) {
    el.removeEventListener('scroll', scrollToBottom)
  },
}
