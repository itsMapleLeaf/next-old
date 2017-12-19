import * as React from 'react'
import styled from 'react-emotion'

import { preventDefault } from '../../common/util/react'
import { withThemeValue } from '../theme'

export const LinkComponent = styled.a`
  display: inline-block;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  transition: 0.2s color;
  color: ${withThemeValue('mainColor', color => color.lightness(70).toString())};

  &:hover {
    color: ${withThemeValue('textColor')};
  }
`

export function Link({ href, onClick, ...props }: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  if (href) {
    return <LinkComponent {...props} href={href} target="_blank" rel="noreferrer noopener" />
  }

  const handleClick = preventDefault(onClick)
  return <LinkComponent {...props} href="#" onClick={handleClick} />
}
