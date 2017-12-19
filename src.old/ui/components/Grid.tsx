import styled from 'react-emotion'

type GridProps = {
  columns?: string
  rows?: string
  gap?: string
}

export const Grid = styled.div`
  display: grid;
  grid-template-columns: ${({ columns }: GridProps) => columns || '100%'};
  grid-template-rows: ${({ rows }: GridProps) => rows || '100%'};
  grid-gap: ${(props: GridProps) => props.gap || '4px'};
`

type GridCellProps = {
  width?: number
  height?: number
}

export const GridCell = styled.div`
  grid-column-end: ${(props: GridCellProps) => `span ${props.width || 1}`};
  grid-row-end: ${(props: GridCellProps) => `span ${props.height || 1}`};
`
