import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import './Loading.scss'

type LoadingProps = { children: React.ReactNode }

export function Loading(props: LoadingProps) {
  return (
    <div className="Loading-shade fullscreen flex-column flex-center">
      <div>
        <Icon className="Loading-icon" size={100}>
          paw
        </Icon>
      </div>
      <h2 className="Loading-text">{props.children}</h2>
    </div>
  )
}
