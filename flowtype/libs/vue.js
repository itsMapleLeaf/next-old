declare module 'vue' {
  declare class Vue {
    constructor (config: Object): void,
    static config: Object,
    static http: typeof VueResource,
    static use (plugin: Object | Function): void,
    static set<T> (object: Object, key: string, value: T): T,
    static delete (object: Object, key: string): void
  }

  declare var exports: typeof Vue
}
