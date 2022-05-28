<template>
  <v-layout full-height>
    <v-container class="d-flex justify-center align-center">
      <v-card width="500" max-height="480" class="pa-7" flat="">
        <img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
            alt=""
        />
        <v-card-text>
          <Form @submit="handleRegister" :validation-schema="schema" ref="form">
            <div v-if="!successful">
              <div class="form-group">
                <label for="formControlSelect">Роль</label>
                <select class="form-control" id="formControlSelect" ref="selectrole">
                  <option>Студент</option>
                  <option>Учитель</option>
                </select>
              </div>

              <div class="form-group">
                <label for="username">Логин</label>
                <Field id="username" name="username" type="text" class="form-control" />
                <ErrorMessage name="username" class="error-feedback" />
              </div>

              <div class="form-group">
                <label for="password">Пароль</label>
                <Field id="password" name="password" type="password" class="form-control" />
                <ErrorMessage name="password" class="error-feedback" />
              </div>

              <div class="form-group pt-5">
                <button class="btn btn-primary v-btn v-btn--block" :disabled="loading">
                  <span v-show="loading" class="spinner-border spinner-border-sm" />
                  Регистрация
                </button>
              </div>
            </div>

            <div v-if="message" class="alert" :class="successful ? 'alert-success' : 'alert-danger'">
              {{ message }}
            </div>
          </Form>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import { Form, Field, ErrorMessage } from 'vee-validate'
import * as yup from 'yup'

export default {
  name: 'RegisterPage',

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data: () => ({
    successful: false,
    loading: false,
    message: '',

    schema: yup.object().shape({
      username: yup.string()
          .required('Логин обязателен')
          .min(3, 'Должено быть минимум 3 символа')
          .max(20, 'Должно быть не больше 20 символов'),

      password: yup.string()
          .required('Пароль обязателен')
          .min(6, 'Должно быть минимум 6 символов')
          .max(40, 'Должно быть не больше 40 символов')
    }),

    roles: [
      { value: 'student', name: 'Студент' },
      { value: 'teacher', name: 'Учитель' }
    ]
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  methods: {
    handleRegister(user)
    {
      user.role = this.roles.find(r => r.name === this.$refs.selectrole.value).value

      this.successful = false
      this.loading = true
      this.message = ''

      this.$store.dispatch('auth/register', user)
          .then(
            data => {
              this.message = data.message
              this.successful = true
              this.loading = false

              setTimeout(() => {
                this.$router.push('/login')
              }, 4000)
            },
            error => {
              this.message =
                  (error.response && error.response.data && error.response.data.message) ||
                  error.message ||
                  error.toString()

              this.successful = false
              this.loading = false

              setTimeout(() => {
                this.message = ''
              }, 4000)
            }
         )
    }
  },
  mounted()
  {
    if (this.loggedIn) {
      this.$router.push('/lessons')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container {
  label {
    display: block;
    margin-top: 10px;
  }
  .profile-img-card {
    display: block;
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    border-radius: 50%;
  }
  .error-feedback {
    color: red;
  }
  .alert {
    margin: 1rem auto;
  }
}
</style>
