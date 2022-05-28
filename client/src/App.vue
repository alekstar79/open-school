<template>
  <v-app>
    <nav class="navbar navbar-expand navbar-light bg-light">
      <div class="container-fluid">
        <div class="collapse navbar-collapse">
          <ul v-if="isProfile || isLesson" class="navbar-nav mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/lessons" class="nav-link">
                К урокам
              </router-link>
            </li>
          </ul>
          <ul v-if="currentUser && !isProfile" class="navbar-nav me-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/profile" class="nav-link">
                <font-awesome-icon icon="user" />
                {{ currentUser.username }}
              </router-link>
            </li>

            <li class="nav-item">
              <span class="nav-link">
                {{ isTeacher ? 'Учитель' : 'Ученик' }}
              </span>
            </li>
          </ul>

          <div v-if="currentUser" class="navbar-nav ml-auto mb-2 mb-lg-0">
            <v-toolbar-items>
              <v-btn v-if="isTeacher" @click="openDialog" class="add" icon="">
                <v-icon color="#999">
                  {{ isLesson ? 'mdi-pencil' : 'mdi-plus' }}
                </v-icon>
                <v-tooltip activator="parent" anchor="bottom">
                  {{ isLesson ? 'Редактировать' : 'Добавить урок' }}
                </v-tooltip>
              </v-btn>

              <v-btn @click="logOut" class="add" icon="">
                <v-icon color="#999">mdi-logout</v-icon>
                <v-tooltip activator="parent" anchor="bottom">
                  Выйти
                </v-tooltip>
              </v-btn>
            </v-toolbar-items>
          </div>
          <ul v-else class="navbar-nav ml-auto mb-2 mb-lg-0">
            <li class="nav-item">
              <router-link to="/register" class="nav-link">
                <font-awesome-icon icon="user-plus" /> Регистрация
              </router-link>
            </li>

            <li class="nav-item">
              <router-link to="/login" class="nav-link">
                <font-awesome-icon icon="sign-in-alt" /> Войти
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>

    <v-main>
      <router-view />
    </v-main>

    <footer class="border-top pa-3">
      <p class="text-center text-muted">© 2022 Открытая Школа</p>
    </footer>

    <v-dialog v-model="addLessonDialog" content-class="add-dialog" max-width="700" max-height="700">
      <v-card v-show="visibleDialog" class="add-dialog__card" rounded>
        <v-card-title>
          {{ isLesson ? 'Редактировать' : 'Создать новый' }} урок
        </v-card-title>

        <v-card-text>
          <form @submit.prevent>
            <div @click="openFile" class="dashed">
              <v-icon v-if="!image">mdi-plus</v-icon>
              <img src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw=="
                  ref="stub"
                  alt=""
              >
            </div>

            <div class="form-group mb-5">
              <label for="inputName">Название урока</label>
              <input v-model="name" type="text" class="form-control" id="inputName">
            </div>

            <div class="form-group mb-7">
              <label for="inputTheme">Тема урока</label>
              <input v-model="theme" type="text" class="form-control" id="inputTheme">
            </div>

            <div class="form-group mb-5">
              <label for="formControlTextarea">Текст урока</label>
              <textarea v-model="text" class="form-control rounded-5" id="formControlTextarea" rows="5"></textarea>
            </div>
          </form>

          <v-card-actions class="justify-content-end">
            <v-btn color="gray" @click="addLesson">
              {{ isLesson ? 'Сохранить' : 'Добавить' }}
            </v-btn>
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-app>
</template>

<script>
import { openFile, toDataUrl, removeNodes, dotsrc } from './utils'

export default {
  name: 'App',

  data: () => ({
    addLessonDialog: false,
    visibleDialog: true,

    image: null,
    name: '',
    theme: '',
    text: ''
  }),
  watch: {
    addLessonDialog()
    {
      removeNodes()

      if (this.$refs.stub) {
        this.$refs.stub.style.width = '0'
        this.$refs.stub.src = dotsrc
      }

      this.image = null
      this.name = ''
      this.theme = ''
      this.text = ''
    }
  },
  computed: {
    currentLesson()
    {
      return this.$store.state.lessons.current
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
    },
    isProfile()
    {
      return this.currentUser && this.$route.name === 'profile'
    },
    isLesson()
    {
      return this.currentUser && this.$route.name === 'lesson'
    }
  },
  methods: {
    openFile()
    {
      openFile('image/*')
        .then(file => this.image = file)
        .then(toDataUrl)
        .then(({ target }) => {
          this.$refs.stub.style.width = '100%'
          this.$refs.stub.src = target.result
        })
        .catch(console.error)
        .finally(() => {
          removeNodes()
        })
    },
    addLesson()
    {
      if (!this.name || !this.theme || !this.text) return

      const query = `lessons/${ this.isLesson ? 'editLesson' : 'addLesson'}`
      const data = {
        owner: this.currentUser.id,
        image: this.$refs.stub.src,
        theme: this.theme,
        name: this.name,
        text: this.text
      }

      if (this.isLesson) {
        data._id = this.currentLesson._id
      }

      this.$store.dispatch(query, data)
        .then(() => {
          if (this.isLesson) {
            this.$store.commit('lessons/setCurrent', data)
          }

          setTimeout(() => {
            this.addLessonDialog = false
          }, 400)
        })
        .catch(console.error)
    },
    prepareForm()
    {
      const { image, name, theme, text } = this.currentLesson

      this.visibleDialog = false
      this.addLessonDialog = true

      setTimeout(() => {
        this.image = this.$refs.stub.src = image
        this.$refs.stub.style.width = '100%'
        this.name = name
        this.theme = theme
        this.text = text

        this.visibleDialog = true

      }, 9)
    },
    openDialog()
    {
      if (this.isLesson) {
        this.prepareForm()
      }

      this.addLessonDialog = true
    },
    logOut()
    {
      this.$store.dispatch('auth/logout')
      this.$router.push('/login')
    }
  }
}
</script>

<style lang="scss">
.navbar {
  .navbar-nav .v-btn {
    font-size: 14px;
    margin-right: 15px;
    height: 36px;
    width: 36px;
  }
  span.nav-link {
    cursor: default;
  }
}
.add-dialog {
  height: 100% !important;
  width: 100% !important;

  .v-card.add-dialog__card {
    border-radius: 10px;
    padding: 20px;
    width: 100%;

    #inputTheme,
    #inputName {
      width: 50%;
    }

    .dashed {
      display: grid;
      place-content: center;
      position: absolute;
      right: 50px;
      top: 107px;
      width: 240px;
      height: 120px;
      cursor: pointer;

      .mdi-plus {
        color: rgba(90,90,90,.3);
        font-size: 2rem;
        font-weight: 900;
      }
      img {
        object-fit: cover;
        height: 100%;
      }
    }
    .dashed::before {
      content: '';
      position: absolute;
      left: 0;
      top: 0;
      right: 0;
      bottom: 0;
      border: 4px dashed rgba(90,90,90,.3);
      box-sizing: border-box;
    }
  }
}
</style>
