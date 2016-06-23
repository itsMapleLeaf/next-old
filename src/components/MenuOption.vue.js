
const template = `
  <a class='hover-darken'>
    <i class='fa fa-{{icon}}'></i> <slot></slot>
  </a>
`

export default {
  template,

  props: {
    icon: String
  }
}
