import {state} from './state'

export function getters (props: string[] | Object): Object {
  const result = {}
  if (props instanceof Array) {
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
