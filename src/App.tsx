import * as React from 'react'
import styled from 'react-emotion'
import * as theme from './ui/styles/theme'

const Main = styled.main`
  ${theme.primary};
`

export class App extends React.Component {
  render() {
    return (
      <Main>
        <h1>hello world</h1>
        <h2>hello world</h2>
        <h3>hello world</h3>
        <h4>hello world</h4>
        <h5>hello world</h5>
        <p>normal paragraph</p>
      </Main>
    )
  }
}
