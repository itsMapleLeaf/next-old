import * as React from 'react'
import css from './Toggle.styl?module'

export default class Toggle extends React.Component {
  props: {
    value: boolean
    disabled: boolean
    children: React.ReactNode
  }

  render() {
    const checkedClass = this.props.value ? css.checked : ''
    const disabledClass = this.props.disabled ? css.disabled : ''

    const iconClass = this.props.value
      ? 'mdi-checkbox-marked-outline'
      : 'mdi-checkbox-blank-outline'

    return (
      <a className={`${css.toggle} ${checkedClass} ${disabledClass}`} href="#">
        <i className={`mdi ${iconClass}`} /> {this.props.children}
      </a>
    )
  }
}
