import Medium from 'medium.js'

export const editor = {
  params: ['placeholder'],
  bind () {
    new Medium({
      element: this.el,
      mode: this.modifiers.partial ? 'partial' : 'inline',
      placeholder: this.params.placeholder
    })
  }
}
