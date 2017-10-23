import * as React from 'react'
import * as ReactDOM from 'react-dom'

type TransitionProps = {
  name: string
}

export class Transition extends React.Component<TransitionProps> {
  componentDidMount() {
    const el = ReactDOM.findDOMNode(this) as HTMLElement
    const activeClass = `${this.props.name}-enter`

    el.addEventListener('animationend', () => {
      el.classList.remove(activeClass)
    })

    el.classList.add(activeClass)
  }

  componentWillUnmount() {
    const el = ReactDOM.findDOMNode(this)
    const { parentNode } = el
    if (parentNode) {
      const cloned = el.cloneNode(true) as Element
      const leaveClass = `${this.props.name}-leave`

      parentNode.insertBefore(cloned, el)

      cloned.addEventListener('animationend', () => {
        cloned.remove()
      })

      cloned.classList.add(leaveClass)
    }
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
