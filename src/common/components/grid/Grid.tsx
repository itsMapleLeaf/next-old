import styled from 'styled-components'

type GridProps = {
  columns?: string | number
  rows?: string | number
  areas?: string[]

  alignContent?: string
  justifyContent?: string

  flow?: string
  gap?: string
  minRowHeight?: string
}

const alignContent = ({ alignContent }: GridProps) =>
  alignContent ? `align-content: ${alignContent}` : ''

const autoRows = ({ minRowHeight = '20px' }) => `minmax(${minRowHeight}, auto)`

const columns = ({ columns = 12 }: GridProps) =>
  typeof columns === 'number' ? `repeat(${columns}, 1fr)` : columns

const flow = ({ flow = 'row' }) => flow

const formatAreas = (areas: string[]) => areas.map(area => `"${area}"`).join(' ')

const gap = ({ gap = '8px' }) => `${gap} ${gap}`

const justifyContent = ({ justifyContent }: GridProps) =>
  justifyContent ? `justify-content: ${justifyContent}` : ''

const templateAreas = ({ areas }: GridProps) =>
  areas ? `grid-template-areas: ${formatAreas(areas)}` : ''

const templateRows = ({ rows }: GridProps) => (rows ? `grid-template-rows: ${rows}` : '')

export const Grid = styled.div`
  display: grid;
  grid-auto-flow: ${flow};
  grid-auto-rows: ${autoRows};
  grid-gap: ${gap};
  grid-template-columns: ${columns};
  ${alignContent};
  ${justifyContent};
  ${templateAreas};
  ${templateRows};
`
