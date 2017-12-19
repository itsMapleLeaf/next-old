import * as React from 'react'
import * as ReactDOM from 'react-dom'

export class AutoScroller extends React.Component {
  shouldScroll = false

  scrollToBottom() {
    const el = ReactDOM.findDOMNode(this)
    el.scrollTop = el.scrollHeight
  }

  componentDidMount() {
    this.scrollToBottom()
  }

  componentWillUpdate() {
    const el = ReactDOM.findDOMNode(this)
    if (el.scrollTop + el.clientHeight === el.scrollHeight) {
      this.shouldScroll = true
    }
  }

  componentDidUpdate() {
    if (this.shouldScroll) {
      this.scrollToBottom()
      this.shouldScroll = false
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
