import * as types from '../mutation-types'

const state = {
  selectedDeviceId: null
}

const getters = {}

const actions = {
  [types.MAIN_SIDEBAR_SELECTED_DEVICEID] ({commit}, {selectedDeviceId}) {
    commit(types.MAIN_SIDEBAR_SELECTED_DEVICEID, {selectedDeviceId})
  }
}

const mutations = {
  [types.MAIN_SIDEBAR_SELECTED_DEVICEID] (state, {selectedDeviceId}) {
    state.selectedDeviceId = selectedDeviceId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
