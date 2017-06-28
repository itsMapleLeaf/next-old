// @flow

function scrollToBottom(event) {
  const el = event.target
  el.dataset.bottomScrollEnabled = el.scrollHeight - el.scrollTop === el.clientHeight ? 'true' : 'false'
}

export const bottomScroll = {
  bind(el: any) {
    el.dataset.bottomScrollEnabled = 'true'
    el.addEventListener('scroll', scrollToBottom)
  },
  update(el: any) {
    if (el.dataset.bottomScrollEnabled === 'true') {
      window.requestAnimationFrame(() => {
        el.scrollTop = el.scrollHeight
      })
    }
  },
  unbind(el: any) {
    el.removeEventListener('scroll', scrollToBottom)
  },
}
