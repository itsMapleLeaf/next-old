import * as React from 'react'

type IconProps = JSX.IntrinsicElements['img'] & {
  size?: number
  name: string
}

export function Icon(props: IconProps) {
  const { size = 18, name, ...imgProps } = props
  const style = { width: size + 'px', height: size + 'px' }
  return <img style={style} src={`/public/icons/${name}.svg`} alt="" {...imgProps} />
}
