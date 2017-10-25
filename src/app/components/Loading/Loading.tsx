import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import './Loading.scss'

type LoadingProps = { text: string }

export function Loading(props: LoadingProps) {
  return (
    <div className="Loading-shade fullscreen flex-column flex-center">
      <div>
        <Icon name="paw" size={100} className="Loading-icon" />
      </div>
      <h2 className="Loading-text">{props.text}</h2>
    </div>
  )
}
