declare module 'bbc.js' {
  type Parser = {
    parse: (input: string) => string
  }

  type ParserOptions = {
    [tag: string]: {
      render: (text: string, param: string) => string
      deep?: boolean
    }
  }

  export function createParser(options: ParserOptions): Parser
}
