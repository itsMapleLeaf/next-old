declare class VueResource {
  static options: Object,
  static post: Function
}

declare module 'vue-resource' {
  declare var exports: typeof VueResource
}
