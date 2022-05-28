import UserService from '@/services/user-service'

export const lessons = {
  namespaced: true,

  state: {
    current: null,
    lessons: []
  },

  mutations: {
    setLessons(state, lessons)
    {
      state.lessons = lessons
    },
    setCurrent(state, lesson)
    {
      state.current = lesson
    }
  },
  actions: {
    getLessons({ commit })
    {
      return UserService.getLessons()
        .then(response => {
          commit('setLessons', response.data)
        })
    },
    addLesson({ dispatch }, lesson)
    {
      return UserService.addLesson(lesson)
        .then(() => {
          dispatch('getLessons')
        })
    },
    editLesson({ dispatch }, lesson)
    {
      return UserService.editLesson(lesson)
        .then(() => {
          dispatch('getLessons')
        })
    },
    removeLesson({ state, commit }, lesson)
    {
      return UserService.removeLesson(lesson)
        .then(({ data }) => {
          if (data.message === 'Урок удален') {
            const slise = state.lessons.filter(l => l._id !== lesson._id)

            commit('setLessons', slise)
          }
        })
    }
  }
}
