import * as React from 'react'
import { Character } from '../store/chat-state'
import './CharacterView.css'

export default function CharacterView(props: { character: Character }) {
  const { name, gender } = props.character
  return (
    <a href="#" style={{ fontWeight: 500 }}>
      <span className={`character-gender-${gender.toLowerCase()}`}>
        {name}
      </span>
    </a>
  )
}
