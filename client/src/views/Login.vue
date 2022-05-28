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
          <Form @submit="handleLogin" :validation-schema="schema" ref="form">
            <div class="form-group">
              <label for="username">Логин</label>
              <Field id="username" name="username" type="text" class="form-control"/>
              <ErrorMessage name="username" class="error-feedback"/>
            </div>

            <div class="form-group">
              <label for="password">Пароль</label>
              <Field id="password" name="password" type="password" class="form-control"/>
              <ErrorMessage name="password" class="error-feedback"/>
            </div>

            <div class="form-group pt-5">
              <button class="btn btn-primary v-btn v-btn--block" :disabled="loading">
                <span v-show="loading" class="spinner-border spinner-border-sm"/>
                Вход
              </button>
            </div>

            <div class="form-group">
              <div v-if="message" class="alert alert-danger" role="alert">
                {{ message }}
              </div>
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
  name: 'LoginPage',

  components: {
    Form,
    Field,
    ErrorMessage,
  },

  data: () => ({
    loading: false,
    message: '',

    schema: yup.object().shape({
      username: yup.string().required('Введите логин'),
      password: yup.string().required('Введите пароль')
    })
  }),
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn
    }
  },
  methods: {
    handleLogin(user)
    {
      this.loading = true

      this.$store.dispatch('auth/login', user)
        .then(
          () => {
            this.$router.push('/lessons')
          },
          error => {
            this.loading = false

            this.message =
              (error.response && error.response.data && error.response.data.message) ||
              error.message ||
              error.toString()

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
    width: 96px;
    height: 96px;
    margin: 0 auto 10px;
    display: block;
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
