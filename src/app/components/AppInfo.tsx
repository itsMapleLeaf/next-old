import { observer } from 'mobx-react'
import * as React from 'react'
import { OverlayState } from 'src/chat/models/OverlayState'
import { FadeTransition } from 'src/common/components/FadeTransition'
import { Overlay } from 'src/common/components/Overlay'

function renderAppInfo(props: { overlay: OverlayState }) {
  return (
    <FadeTransition visible={props.overlay.isOpen}>
      <Overlay>
        <div className="bg-color-main text-center padding" style={{ width: '300px' }}>
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
            <a className="bbc-link" href="https://github.com/kingdaro/next" target="_blank">
              Project page on GitHub
            </a>
          </p>
          <p>
            If you find a bug or have a suggestion not listed on the project page, make an issue for
            it on GitHub, or
            <a className="bbc-link" href="https://www.f-list.net/c/testificate/" target="_blank">
              send a note to my testing character.
            </a>
          </p>
          <p>
            <button onClick={props.overlay.hide}>I understand. Show me the thing.</button>
          </p>
        </div>
      </Overlay>
    </FadeTransition>
  )
}

export const AppInfo = observer(renderAppInfo)
