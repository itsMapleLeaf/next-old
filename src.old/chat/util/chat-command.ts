/**
 * Represents information for a chat command entered by the user.
 *
 * Example:
 *
 * input: /op Some Character
 *
 * output:
 * ```ts
 * {
 *   command: 'op',
 *   params: ['Some', 'Character'],
 *   paramString: 'Some Character',
 * }
 * ```
 */
export type CommandInfo = {
  command: string
  params: string[]
  paramString: string
}

const commandExp = /^\/([a-z]+)\s*(.*)/i

export function parseChatCommand(text: string): CommandInfo | void {
  const match = text.match(commandExp)
  if (match) {
    const [, command, paramString] = match
    const params = paramString.trim().split(/\s+/g)
    return {
      command: command.toLowerCase(),
      params,
      paramString,
    }
  }
}
