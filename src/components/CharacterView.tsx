import * as React from 'react'
import { Character } from '../store/chat-state'
import './CharacterView.css'

export default function CharacterView(props: { character: Character }) {
  const { name, gender, status } = props.character
  return (
    <a href="#" style={{ fontWeight: 500 }}>
      <span
        className={`character-status-${status.toLowerCase()}`}
        style={{ transform: 'scale(1.3)', display: 'inline-block' }}
      >
        &bull;
      </span>{' '}
      <span className={`character-gender-${gender.toLowerCase()}`}>{name}</span>
    </a>
  )
}
