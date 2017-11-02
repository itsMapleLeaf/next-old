import * as React from "react"

/**
 * A utility type for what can be returned from a render() function.
 * ReactNode doesn't work, because ReactNode includes undefined,
 * and render() functions can only return null.
 */
export type RenderResult =
  | JSX.Element
  | JSX.Element[]
  | React.ReactPortal
  | string
  | number
  | null
  | false

export function preventDefault<E extends React.SyntheticEvent<any>>(next?: (event: E) => void) {
  return (event: E) => {
    event.preventDefault()
    if (next) next(event)
  }
}

export function stopPropagation<E extends React.SyntheticEvent<any>>(next?: (event: E) => void) {
  return (event: E) => {
    event.stopPropagation()
    if (next) next(event)
  }
}
