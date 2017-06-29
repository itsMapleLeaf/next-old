// @flow
export const assign = Object.assign || function assign(base, ...rest) {
  for (const obj of rest) {
    for (const field in obj) {
      base[field] = obj[field]
    }
  }
  return base
}

export const values = Object.values || function values(obj) {
  let result = []
  for (const field in obj) {
    result.push(obj[field])
  }
  return result
}

// uppercase the first letter of a string and lowercase the rest
export function capitalize(text: string) {
  return text.substring(0, 1).toLocaleUpperCase() + text.substring(1).toLocaleLowerCase()
}

// remove an element from an array
export function remove(array: any[], item: any) {
  return array.filter(v => v !== item)
}

// clamp a number between an upper and lower bound
export function clamp(n: number, min: number, max: number) {
  return n < min ? min : n > max ? max : n
}

// map an array to object keys/values
export function mapToObject <T>(array: T[], func: (item: T) => [string, any]) {
  let result = {}
  for (let item of array) {
    const [key, value] = func(item)
    result[key] = value
  }
  return result
}
