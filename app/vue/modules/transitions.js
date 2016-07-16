export const collapse = {
  css: false,

  enter (el, done) {
    el.style.maxHeight = '0px'
    window.requestAnimationFrame(() => {
      // make the collapse transition fluid to the element height
      el.style.maxHeight = el.scrollHeight + 'px'
      el.style.transition = 'ease 0.3s max-height'
      el.style.overflow = 'hidden'
      window.setTimeout(done, 300)
    })
  },

  leave (el, done) {
    el.style.maxHeight = '0px'
    window.setTimeout(done, 300)
  }
}
