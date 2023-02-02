import { createStore } from 'vuex'

export default createStore({
  state: {
    activeState: 'StateA',
    distance: 0
  },
  mutations: {
    SET_STATE(state, id) {
      state.activeState = id
    },
    SET_DISTANCE(state, distance) {
      state.distance = distance
    }
  },
  actions: {
    setScene({ commit }, id) {
      commit('SET_STATE', id)
    },
    setDistance({ commit }, id) {
      commit('SET_DISTANCE', id)
    },
  }
})
