<template>
  <v-layout :class="{ empty: !lessons.length }" full-height>
    <template v-if="lessons.length">
      <v-card
          v-for="(lesson, i) in lessons"
          @click="viewLesson(lesson)"
          class="mx-auto"
          height="260"
          width="390"
          :key="i"
      >
        <v-toolbar-items>
          <v-btn
              v-if="isTeacher && currentUser.id === lesson.owner"
              @click.stop="removeLesson(lesson)"
              class="remove"
              icon=""
          >
            <v-icon color="#999">mdi-close</v-icon>
            <v-tooltip activator="parent" anchor="bottom">
              Удалить
            </v-tooltip>
          </v-btn>
          <!--<v-btn
              v-if="isTeacher && currentUser.id === lesson.owner"
              @click.stop="editLesson(lesson)"
              class="edit"
              icon=""
          >
            <v-icon color="#999">mdi-pencil</v-icon>
            <v-tooltip activator="parent" anchor="bottom">
              Ркдактировать
            </v-tooltip>
          </v-btn>-->
        </v-toolbar-items>

        <v-card-title>
          {{ lesson.name }}
        </v-card-title>

        <v-card-subtitle>
          {{ lesson.theme }}
        </v-card-subtitle>

        <v-card-img>
          <img :src="lesson.image" :alt="lesson.name" />
        </v-card-img>
      </v-card>
    </template>
    <template v-else>
      <v-container class="text-center">
        <h1 class="display-4 font-weight-bold">
          Уроков нет, стань учителем и внеси свой вклад!
        </h1>
      </v-container>
    </template>
  </v-layout>
</template>

<script>
export default {
  name: 'LessonsPage',

  data: () => ({
    content: ''
  }),
  methods: {
    removeLesson(lesson)
    {
      this.$store.dispatch('lessons/removeLesson', lesson)
    },
    viewLesson(lesson)
    {
      this.$store.commit('lessons/setCurrent', lesson)
      this.$router.push(`/lesson/${lesson._id}`)
    }
  },
  computed: {
    lessons() {
      return this.$store.state.lessons.lessons
    },
    currentUser()
    {
      return this.$store.state.auth.user
    },
    isTeacher()
    {
      if (this.currentUser && this.currentUser['role']) {
        return this.currentUser['role'] === 'ROLE_TEACHER'
      }

      return false
    }
  },
  mounted()
  {
    this.$store.dispatch('lessons/getLessons')
      .catch(error => {
        this.content =
            (error.response && error.response.data && error.response.data.message) ||
            error.message ||
            error.toString()
      })
  }
}
</script>

<style lang="scss" scoped>
.v-layout {
  &:not(.empty) {
    display: grid;
    grid-template-columns: repeat(auto-fill, 460px);
    gap: 20px;
  }
  .v-container {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  // place-items: center;
  justify-content: center;
  padding: 20px 80px;

  .v-card {
    border-radius: 10px;

    .v-btn {
      display: grid;
      place-content: center;
      position: absolute;

      height: 24px;
      width: 24px;

      font-size: 10px;
      z-index: 99;

      &.remove {
        right: 5px;
        top: 5px;
      }
      &.edit {
        right: 5px;
        top: 32px;
      }
    }
    .v-card-title {
      font-size: 14px;
      line-height: 1.2rem;
    }
    .v-card-img {
      border-radius: 0 0 10px 10px;
      height: unset;
      top: unset;
      bottom: 0;

      img {
        background-size: cover;
        max-height: 163px;
        width: 100%;
      }
    }
  }
}
</style>
