export function newCharacter (name, gender, status = 'online', statusmsg = '') {
  return { name, gender, status, statusmsg }
}
