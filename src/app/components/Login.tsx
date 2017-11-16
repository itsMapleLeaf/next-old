import { bind } from 'decko'
import { Form, Formik, FormikProps } from 'formik'
import * as React from 'react'
import { preventDefault } from 'src/common/util/react'
import { StoredValue } from 'src/common/util/storage'
import { Link } from 'src/ui/components'
import { Button } from 'src/ui/components/Button'
import { Input } from 'src/ui/components/Input'

type LoginProps = {
  onSubmit: (username: string, password: string) => void
  onAbout: () => void
  statusText: string
}

type FormValues = {
  username: string
  password: string
}

const storedUsername = new StoredValue<string>('Login_username')

export class Login extends React.Component<LoginProps> {
  form: Formik | null

  async componentDidMount() {
    if (this.form) {
      const username = await storedUsername.restore()
      this.form.setFieldValue('username', username || '')
    }
  }

  render() {
    const handleAbout = preventDefault(this.props.onAbout)

    return (
      <div className="text-center">
        <h1 className="margin">Hello, beautiful.</h1>
        <Formik
          initialValues={{ username: '', password: '' }}
          render={this.renderForm}
          onSubmit={this.handleSubmit}
          ref={form => (this.form = form)}
        />
        <p>{this.props.statusText}</p>
        <p>
          <Link onClick={handleAbout}>About</Link>
        </p>
      </div>
    )
  }

  @bind
  private renderForm(props: FormikProps<FormValues>) {
    return (
      <Form>
        <fieldset>
          <Input
            name="username"
            type="text"
            placeholder="Username"
            value={props.values.username}
            onChange={props.handleChange}
          />
        </fieldset>
        <fieldset>
          <Input
            name="password"
            type="password"
            placeholder="Password"
            value={props.values.password}
            onChange={props.handleChange}
          />
        </fieldset>
        <fieldset>
          <Button type="submit">Submit</Button>
        </fieldset>
      </Form>
    )
  }

  @bind
  private handleSubmit(values: FormValues) {
    this.props.onSubmit(values.username, values.password)
    storedUsername.save(values.username).catch(console.warn)
  }
}
