import { observer } from 'mobx-react'
import * as React from 'react'
import { Button, Link, Overlay } from 'src/ui/components'
import { OverlayViewModel } from 'src/ui/models/OverlayViewModel'

function renderAppInfo(props: { overlay: OverlayViewModel }) {
  if (props.overlay.isOpen) {
    return (
      <Overlay>
        <div
          className="bg-color-main text-center padding scroll-v"
          style={{
            width: '300px',
            maxWidth: 'calc(100vw - 40px)',
            maxHeight: 'calc(100vh - 40px)',
          }}
        >
          <h2>
            {APP_NAME} v{APP_VERSION}
          </h2>
          <p>
            Thanks for testing this early beta! I put a lot of work into this over the past few
            months, so I hope you'll like it!
          </p>
          <p>
            Keep in mind: some features may be missing, or even <strong>horribly</strong> broken, so
            use at your own risk!
          </p>
          <p>
            <Link href="https://github.com/kingdaro/next">Project page on GitHub</Link>
          </p>
          <p>
            If you find a bug or have a suggestion not listed on the project page, make an issue for
            it on GitHub, or
            <Link href="https://www.f-list.net/c/next-dev/">send me a note here.</Link>
          </p>
          <p>
            <Button onClick={props.overlay.hide}>I understand. Show me the thing.</Button>
          </p>
        </div>
      </Overlay>
    )
  }

  return null
}

export const AppInfo = observer(renderAppInfo)