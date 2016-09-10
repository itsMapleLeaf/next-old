declare module 'vue-resource' {
  declare class VueResource {
    static options: Object,
    static post: Function
  }

  declare var exports: typeof VueResource
}
