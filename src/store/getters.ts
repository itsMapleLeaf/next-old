import { state } from './state'

export function getters(props: any): Object {
  const result = {}
  if (Array.isArray(props)) {
    for (const name of props) {
      result[name] = () => state[name]
    }
  } else {
    for (const name in props) {
      result[name] = () => state[props[name]]
    }
  }
  return result
}
