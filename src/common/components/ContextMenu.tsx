import { bind } from 'decko'
import * as React from 'react'
import * as ReactDOM from 'react-dom'

type ContextMenuProps = {
  x: number
  y: number
}

export class ContextMenu extends React.Component<ContextMenuProps> {
  @bind
  updatePosition() {
    const el = ReactDOM.findDOMNode(this)
    if (el instanceof HTMLElement) {
      const rect = el.getBoundingClientRect()
      const { x, y } = this.props
      const right = x + rect.width
      const bottom = y + rect.height

      el.style.position = 'absolute'
      el.style.left = x - Math.max(right - (window.innerWidth - 16), 0) + 'px'
      el.style.top = y - Math.max(bottom - (window.innerHeight - 16), 0) + 'px'
    }
  }

  componentDidMount() {
    requestAnimationFrame(this.updatePosition)
  }

  componentDidUpdate() {
    requestAnimationFrame(this.updatePosition)
  }

  render() {
    return <div>{this.props.children}</div>
  }
}
