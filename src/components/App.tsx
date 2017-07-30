import * as React from 'react'
import Login from './Login'

export default class App extends React.Component {
  render() {
    return <Login status="test" onSubmit={console.log} />
  }
}
