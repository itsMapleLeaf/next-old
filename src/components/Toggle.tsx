import * as React from 'react'
import css from './Toggle.styl?module'

export default class Toggle extends React.Component {
  props: {
    value: boolean
    children: React.ReactNode
  }

  render() {
    const iconClass = this.props.value
      ? 'mdi-checkbox-marked-outline'
      : 'mdi-checkbox-blank-outline'

    return (
      <a className={css.toggle} href="#">
        <i className={`mdi ${iconClass}`} /> {this.props.children}
      </a>
    )
  }
}
