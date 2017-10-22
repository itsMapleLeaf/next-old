import * as React from 'react'
import { Icon } from 'src/app/components/Icon'
import './Loading.scss'

type LoadingProps = { children: React.ReactNode }

export function Loading(props: LoadingProps) {
  return (
    <div className="loading-shade fullscreen flex-column flex-center">
      <div>
        <Icon className="loading-icon" size={100}>
          paw
        </Icon>
      </div>
      <h2 className="loading-text">{props.children}</h2>
    </div>
  )
}
