declare module 'localforage' {
  declare function getItem (key: string): Promise<any>
  declare function setItem <T> (key: string, value: T): Promise<T>
  declare function clear (): Promise<void>
}
