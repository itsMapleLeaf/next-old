import * as React from 'react'

export function preventDefault<E extends React.SyntheticEvent<any>>(next: (event: E) => void) {
  return (event: E) => {
    event.preventDefault()
    next(event)
  }
}
