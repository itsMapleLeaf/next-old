
export const getLoginStatus = state => state.loginStatusMessage

export const getUserCharacters = state =>
  state.loginData.characters
    .slice()
    .sort()

export const getDefaultCharacter = state => state.loginData.default_character

export const getCharacterName = state => state.character

export const getAccount = state => state.account

export const getApiTicket = state => state.loginData.ticket

export const getCurrentOverlay = state => state.currentOverlay

export const getAllChannels = state =>
  state.publicChannels.concat(state.privateChannels)

