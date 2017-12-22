import { bind } from 'decko'
import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import styled from 'react-emotion'
import { StoreSubscriber } from '../../storeBroadcast'
import { Button, Input } from '../../ui/components'
import { helpers, theme } from '../../ui/styles'

const PageContainer = styled.main`
  ${helpers.flexCenter};
  ${helpers.fullscreen};
`

const Header = styled.header`
  padding: 0.8rem 0.5rem;
`

const Panel = styled.section`
  ${theme.primary};
  ${theme.shadow};
  padding: 0.5rem;
  text-align: center;
  max-width: calc(100vw - 2em);
`

type Props = {
  onSubmit: (username: string, password: string) => void
  statusMessage: string
}

type LoginValues = {
  username: string
  password: string
}

class LoginComponent extends React.Component<Props> {
  render() {
    return (
      <PageContainer>
        <Panel>
          <Header>
            <h1>Hello, beautiful.</h1>
          </Header>

          <Formik
            initialValues={{ username: '', password: '' }}
            render={this.renderForm}
            onSubmit={this.handleSubmit}
          />

          {this.props.statusMessage && <p>{this.props.statusMessage}</p>}
        </Panel>
      </PageContainer>
    )
  }

  @bind
  private renderForm(props: FormikProps<LoginValues>) {
    return (
      <form onSubmit={props.handleSubmit}>
        <fieldset>
          <Input
            type="text"
            name="username"
            placeholder="Username"
            value={props.values.username}
            onChange={props.handleChange}
          />
        </fieldset>
        <fieldset>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={props.values.password}
            onChange={props.handleChange}
          />
        </fieldset>
        <fieldset>
          <Button type="submit">Submit</Button>
        </fieldset>
      </form>
    )
  }

  @bind
  private handleSubmit(values: LoginValues) {
    this.props.onSubmit(values.username, values.password)
  }
}

export const Login = () => (
  <StoreSubscriber>
    {({ appStore }) => (
      <LoginComponent onSubmit={appStore.handleLoginSubmit} statusMessage={appStore.loginStatus} />
    )}
  </StoreSubscriber>
)
