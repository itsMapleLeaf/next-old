export function bound<T = {}>(constructor: T, key: string, descriptor: PropertyDescriptor) {
  return {
    configurable: true,
    get() {
      return descriptor.value.bind(this)
    },
  }
}
