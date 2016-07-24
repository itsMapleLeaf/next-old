type CompareFunction = (a: any, b: any) => number
export function compareByField (field: string): CompareFunction {
  return (a: Object, b: Object) => a[field].localeCompare(b[field])
}

type GroupFilterFunction = (value: any) => string
type GroupMap = { [name: string]: Array }
export function groupSort (items: Array, filter: GroupFilterFunction): GroupMap {
  const groups = {}

  for (let item of items) {
    const cat: string = filter(item)
    groups[cat] = groups[cat] || []
    groups[cat].push(item)
  }

  return groups
}
