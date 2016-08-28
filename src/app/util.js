// return the values of an object
function values (obj) {
  return Object.values ? Object.values(obj) : Object.keys(obj).map(key => obj[key])
}

// assign the key/value pairs from other objects to a fresh object
function assign (...objs) {
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
function capitalize (text) {
  return text.substring(0, 1).toLocaleUpperCase() + text.substring(1).toLocaleLowerCase()
}

// remove an element from an array (destructive)
function remove (array, item) {
  const index = array.indexOf(item)
  if (index > -1) {
    array.splice(index, 1)
  }
}

// clamp a number between an upper and lower bound
function clamp (n, min, max) {
  return n < min ? min : n > max ? max : n
}

// map an array to object keys/values
function mapToObject (set, func) {
  let result = {}
  for (let item of set) {
    const [key, value] = func(item)
    result[key] = value
  }
  return result
}

export { values, assign, capitalize, remove, clamp, mapToObject }
