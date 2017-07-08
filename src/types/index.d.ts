interface NodeModule {
  hot: any
}

declare module '*.svg' {
  const imagePath: string
  export default imagePath
}
