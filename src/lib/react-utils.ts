import * as React from 'react'

export type SubmitEvent = React.SyntheticEvent<HTMLFormElement>

export type InputEvent = React.SyntheticEvent<
  HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
>

export function linkState(component: React.Component, field: string) {
  return (event: InputEvent) => {
    const { value } = event.currentTarget
    component.setState(() => ({ [field]: value }))
  }
}

export function preventDefault(next: (event: React.SyntheticEvent<any>) => any) {
  return (event: React.SyntheticEvent<any>) => {
    event.preventDefault()
    next(event)
  }
}
