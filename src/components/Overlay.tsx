import * as React from 'react'
import { MouseEvent } from '../lib/react-utils'
import './Overlay.css'

export default class Overlay extends React.Component {
  props: {
    onShadeClick?: () => any
    children?: React.ReactNode
  }

  shade: HTMLElement | null

  handleClick = (event: MouseEvent) => {
    if (event.target === this.shade && this.props.onShadeClick != null) {
      this.props.onShadeClick()
    }
  }

  render() {
    return (
      <div
        className="overlay-shade fullscreen flex-column"
        ref={el => (this.shade = el)}
        onMouseDown={this.handleClick}
      >
        <div className="overlay-content-container bg-1">
          {this.props.children}
        </div>
      </div>
    )
  }
}
