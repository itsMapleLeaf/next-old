import * as React from 'react'
import * as glamor from 'glamor'

const styles = {
  toggle: glamor.css({
    fontSize: '90%',
    opacity: 0.7,
    borderBottom: '1px solid transparent',
    transition: '0.2s',

    ':hover': {
      opacity: 1,
      borderBottomColor: 'hsla(0, 0%, 100%, 0.3)',
    },
  }),
  checked: glamor.css({
    opacity: 0.8,
  }),
  disabled: glamor.css({
    opacity: 0.3,
    pointerEvents: 'none',
  }),
}

export default class Toggle extends React.Component {
  props: {
    value: boolean
    disabled: boolean
    children: React.ReactNode
  }

  render() {
    const checkedClass = this.props.value ? styles.checked : ''
    const disabledClass = this.props.disabled ? styles.disabled : ''

    const iconClass = this.props.value
      ? 'mdi-checkbox-marked-outline'
      : 'mdi-checkbox-blank-outline'

    const classes = `${styles.toggle} ${checkedClass} ${disabledClass}`

    return (
      <a className={classes} href="#">
        <i className={`mdi ${iconClass}`} /> {this.props.children}
      </a>
    )
  }
}
