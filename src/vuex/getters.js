
export const getLoginStatus =
  state => state.loginStatusMessage

export const getUserCharacters =
  state => state.userData.characters
    .slice()
    .sort()

export const getDefaultCharacter =
  state => state.userData.default_character

export const getCharacterName =
  state => state.character

export const getAccount =
  state => state.account

export const getApiTicket =
  state => state.userData.ticket
