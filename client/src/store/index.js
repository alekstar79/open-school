import { createStore } from 'vuex'

import { lessons } from './modules/lessons'
import { auth } from './modules/auth'

export default createStore({
  modules: {
    lessons,
    auth
  }
})
