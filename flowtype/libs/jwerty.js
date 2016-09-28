declare module 'jwerty' {
  declare type SubscriptionHandle = {
    unbind: Function,
  }

  declare var jwerty: {
    key: (code: string, callback: Function, context?: Object) => SubscriptionHandle,
    event: (code: string, callback: Function, context?: Object) => SubscriptionHandle,
    is: (code: string, event: Object, sequenceKey?: number) => boolean,
    fire: (code: string, selector?: string, selectorContext?: string, sequenceKey: number) => void,
  }
}
