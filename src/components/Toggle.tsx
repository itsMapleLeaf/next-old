import * as React from 'react'
import css from './Toggle.styl?module'

export default class Toggle extends React.Component {
  render() {
    return (
      <a className={css.toggle} href="#">
        <i className="mdi mdi-checkbox-marked-outline" /> {this.props.children}
      </a>
    )
  }
}
