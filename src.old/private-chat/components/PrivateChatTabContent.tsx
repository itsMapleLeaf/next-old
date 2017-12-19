import * as React from 'react'
import { getAvatarURL } from 'src/api'

export function PrivateChatTabContent(props: { partner: string }) {
  return (
    <div className="flex-row flex-align-center">
      <img
        src={getAvatarURL(props.partner)}
        className="margin-right"
        style={{ width: '24px', height: '24px', verticalAlign: 'middle' }}
      />
      {props.partner}
    </div>
  )
}
