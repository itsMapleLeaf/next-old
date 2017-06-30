import * as React from 'react'
import './Overlay.css'

export default class Overlay extends React.Component {
  render() {
    return (
      <div className="overlay-shade fullscreen flex-column">
        <div className="overlay-content-container bg-1">
          {this.props.children}
        </div>
      </div>
    )
  }
}
