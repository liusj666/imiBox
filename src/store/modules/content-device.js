import * as types from '../mutation-types'

const state = {
  groupInfo: [],
  pointInfo: [],
  selectedGroupId: ''
  // firstGroup: ''
}

const getters = {}

const actions = {
  [types.CONTENT_SELECTED_DEVICE] ({commit}, {groupInfo}) {
    commit(types.CONTENT_SELECTED_DEVICE, {groupInfo})
  },
  [types.CONTENT_SELECTED_GROUP] ({commit}, {pointInfo}) {
    commit(types.CONTENT_SELECTED_GROUP, {pointInfo})
  },
  [types.CONTENT_SELECTED_GROUPID] ({commit}, {selectedGroupId}) {
    commit(types.CONTENT_SELECTED_GROUPID, {selectedGroupId})
  }
}

const mutations = {
  [types.CONTENT_SELECTED_DEVICE] (state, {groupInfo}) {
    state.groupInfo = groupInfo
  },
  [types.CONTENT_SELECTED_GROUP] (state, {pointInfo}) {
    state.pointInfo = pointInfo
  },
  [types.CONTENT_SELECTED_GROUPID] (state, {selectedGroupId}) {
    state.selectedGroupId = selectedGroupId
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
