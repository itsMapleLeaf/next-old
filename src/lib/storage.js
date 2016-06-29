export const keys = {
  account: () => 'fchat-next:account',
  ticket: account => `fchat-next:ticket:${account}`,
  character: account => `fchat-next:character:${account}`
}
