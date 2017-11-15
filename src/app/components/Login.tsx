import { bind } from 'decko'
import { Field, Form, Formik, FormikProps } from 'formik'
import { observer } from 'mobx-react'
import * as React from 'react'

import { preventDefault } from '../../common/util/react'
import { StoredValue } from '../../common/util/storage'

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

@observer
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
          <a href="#" className="bbc-link" onClick={handleAbout}>
            About
          </a>
        </p>
      </div>
    )
  }

  @bind
  private renderForm(props: FormikProps<FormValues>) {
    return (
      <Form>
        <fieldset>
          <Field name="username" type="text" placeholder="Username" />
        </fieldset>
        <fieldset>
          <Field name="password" type="password" placeholder="Password" />
        </fieldset>
        <fieldset>
          <button type="submit">Submit</button>
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
