import { bind } from 'decko'
import { Formik, FormikProps } from 'formik'
import * as React from 'react'
import styled from 'react-emotion'
import { getAvatarURL } from '../../api'
import { Button, Link, Select } from '../../ui/components'
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

const AvatarImage = styled.img`
  width: 100px;
  height: 100px;
`

const BackButton = styled(Link)`
  display: inline-block;
  margin: 0.5rem 0 0.8rem;
  ${helpers.faded};
`

type FormValues = {
  character: string
}

type Props = {
  characters: string[]
  initialCharacter: string
  onCharacterChange: (character: string) => void
  onSubmit: (values: FormValues) => void
  onBack: () => void
}

export class CharacterSelect extends React.Component<Props> {
  render() {
    return (
      <PageContainer>
        <Panel>
          <Header>
            <h1>Choose your identity.</h1>
          </Header>

          <Formik
            initialValues={{ character: this.props.initialCharacter }}
            render={this.renderForm}
            onSubmit={this.handleSubmit}
          />

          <BackButton onClick={this.props.onBack}>Back to Login</BackButton>
        </Panel>
      </PageContainer>
    )
  }

  @bind
  private renderForm(props: FormikProps<FormValues>) {
    return (
      <form onSubmit={props.handleSubmit}>
        <fieldset>
          <AvatarImage
            src={getAvatarURL(props.values.character)}
            alt={`Avatar for ${props.values.character}`}
          />
        </fieldset>

        <fieldset>
          <Select
            name="character"
            value={props.values.character}
            onChange={event => this.handleChange(event, props)}
          >
            {this.props.characters.map(name => <option key={name}>{name}</option>)}
          </Select>
        </fieldset>

        <fieldset>
          <Button type="submit">Enter chat</Button>
        </fieldset>
      </form>
    )
  }

  @bind
  private handleChange(
    event: React.ChangeEvent<HTMLSelectElement>,
    props: FormikProps<FormValues>,
  ) {
    props.handleChange(event)
    this.props.onCharacterChange(event.currentTarget.value)
  }

  @bind
  private handleSubmit(values: FormValues) {
    this.props.onSubmit(values)
  }
}

export { FormValues as CharacterSelectValues }
