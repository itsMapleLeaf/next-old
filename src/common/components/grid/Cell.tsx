import styled from 'styled-components'

type CellProps = {
  width?: string | number
  height?: string | number
  left?: string | number
  top?: string | number
  center?: boolean
  middle?: boolean
  area?: string
}

export const Cell = styled.section`
  height: 100%;
  min-width: 0;
  overflow: hidden;
  align-content: space-around;
  grid-column-end: ${({ width = 1 }: CellProps) => `span ${width}`};
  grid-row-end: ${({ height = 1 }: CellProps) => `span ${height}`};
  ${({ left }: CellProps) => (left ? `grid-column-start: ${left}` : '')};
  ${({ top }: CellProps) => (top ? `grid-row-start: ${top}` : '')};
  ${({ center }: CellProps) => (center ? `text-align: center` : '')};
  ${({ area }: CellProps) => (area ? `grid-area: ${area}` : '')};
  ${/* prettier-ignore */
  ({ middle }: CellProps) => middle ? `
    display: inline-flex;
    flex-flow: column wrap;
    justify-content: center;
    justify-self: stretch;
  ` : ''};
`
