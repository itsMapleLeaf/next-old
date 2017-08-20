import Vue from 'vue'

export const autoScroll = {
  update(el) {
    if (el.scrollTop + el.clientHeight === el.scrollHeight) {
      Vue.nextTick(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight
      })
    }
  },
}
