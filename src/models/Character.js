export default function Character (name, gender, status = 'online', statusMessage = '') {
  return { name, gender, status, statusMessage }
}
