declare class Vue {
  constructor (config: Object): void,
  static config: Object,
  static use: Function,
  static http: typeof VueResource
}

declare module 'vue' {
  declare var exports: typeof Vue
}
