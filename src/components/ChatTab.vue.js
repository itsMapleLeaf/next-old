
const template = `
  <a class='box center-vertical hover-lighten' :class="{ 'selected': selected }">
    <span><slot></slot></span>
  </a>
`

export default {
  template,

  props: {
    selected: Boolean
  }
}
