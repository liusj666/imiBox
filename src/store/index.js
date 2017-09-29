import Vue from 'vue'
import Vuex from 'vuex'

import mainHeader from './modules/main-header'
import mainSidebar from './modules/main-sidebar'
import contentDevice from './modules/content-device'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    mainHeader,
    mainSidebar,
    contentDevice
  }
})
