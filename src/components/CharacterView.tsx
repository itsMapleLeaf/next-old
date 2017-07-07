import * as React from 'react'
import { Character } from '../store/chat-state'
import './CharacterView.css'

export default function CharacterView(props: { character: Character }) {
  const { name, gender, status } = props.character
  return (
    <a href="#" className="character">
      <span className={`character-status character-status-${status.toLowerCase()}`}>
        &bull;
      </span>{' '}
      <span className={`character-gender-${gender.toLowerCase()}`}>{name}</span>
    </a>
  )
}
