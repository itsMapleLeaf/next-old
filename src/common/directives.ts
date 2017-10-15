import Vue, { DirectiveOptions } from 'vue'

export const autoScroll: DirectiveOptions = {
  update(el) {
    if (el.scrollTop + el.clientHeight === el.scrollHeight) {
      Vue.nextTick(() => {
        el.scrollTop = el.scrollHeight - el.clientHeight
      })
    }
  },
}

export const focus: DirectiveOptions = {
  inserted(el) {
    el.focus()
  },
}
