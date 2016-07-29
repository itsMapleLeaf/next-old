// return the values of an object
export const values = Object.values || function values (obj) {
  return Object.keys(obj).map(key => obj[key])
}

// assign the key/value pairs from other objects to a fresh object
export function assign (...objs) {
  if (Object.assign) {
    return Object.assign({}, ...objs)
  } else {
    const result = {}
    for (let obj of objs) {
      for (let key in obj) {
        result[key] = obj[key]
      }
    }
    return result
  }
}

// uppercase the first letter of a string and lowercase the rest
export function capitalize (text) {
  return text.substring(0, 1).toLocaleUpperCase() + text.substring(1).toLocaleLowerCase()
}
