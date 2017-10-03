function encodeLower(str: string) {
  return encodeURI(str.toLowerCase())
}

export function getAvatarURL(name: string) {
  return `https://static.f-list.net/images/avatar/${encodeLower(name)}.png`
}

export function getProfileURL(name: string) {
  return `https://www.f-list.net/c/${encodeLower(name)}`
}

export function getExtendedIcon(name: string) {
  return `https://static.f-list.net/images/eicon/${encodeLower(name)}.gif`
}
