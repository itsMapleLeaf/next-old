export default function Character (name, gender, status = 'online', statusMessage = '') {
  return {
    name,          // string
    gender,        // enum: 'Male' | 'Female' | 'Transgender' | 'Herm' | 'Shemale' | 'Cunt-boy' | 'Male-herm' | 'None'
    status,        // enum: 'online' | 'busy' | 'away' | 'dnd' | 'idle' | 'offline'
    statusMessage, // string
  }
}
