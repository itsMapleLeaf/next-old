import * as api from '../../api'
import forage from 'localforage'

export default {
  state: {
    account: '',
    ticket: '',
    characters: [],
  },
  mutations: {
    SET_ACCOUNT(state, account) {
      state.account = account
    },

    SET_TICKET(state, ticket) {
      state.ticket = ticket
    },

    SET_CHARACTERS(state, characters) {
      state.characters = characters
    },
  },
  actions: {
    async fetchTicket(context, { account, password }) {
      const ticket = await api.fetchTicket(account, password)
      context.commit('SET_ACCOUNT', account)
      context.commit('SET_TICKET', ticket)
    },

    async fetchCharacters(context) {
      const { account, ticket } = context.state
      const characters = await api.fetchCharacterList(account, ticket)
      context.commit('SET_CHARACTERS', characters)
    },

    async loadAuthData({ commit }) {
      const auth = (await forage.getItem('auth')) || {}
      commit('SET_ACCOUNT', auth.account || '')
      commit('SET_TICKET', auth.ticket || '')
    },

    async saveAuthData({ state }) {
      const { account, ticket } = state
      await forage.setItem('auth', { account, ticket })
    },
  },
}
