import * as React from 'react'
import * as ReactDOM from 'react-dom'

export class AutoScroller extends React.Component {
  shouldScroll = false

  componentWillUpdate() {
    const el = ReactDOM.findDOMNode(this)
    if (el.scrollTop + el.clientHeight === el.scrollHeight) {
      this.shouldScroll = true
    }
  }

  componentDidUpdate() {
    if (this.shouldScroll) {
      const el = ReactDOM.findDOMNode(this)
      el.scrollTop = el.scrollHeight
      this.shouldScroll = false
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
