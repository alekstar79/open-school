<template>
  <v-layout full-height>
    <v-container class="d-flex justify-center align-center">
      <v-card class="pa-5" flat="">
        <v-card-text>
          <h3>{{ content }}</h3>
        </v-card-text>
      </v-card>
    </v-container>
  </v-layout>
</template>

<script>
import UserService from '../services/user-service'

export default {
  name: 'HomeBoard',

  data() {
    return {
      content: '',
    }
  },
  mounted()
  {
    UserService.getPublicContent()
        .then(
          response => {
            this.content = response.data
          },
          error => {
            this.content =
                (error.response && error.response.data && error.response.data.message) ||
                error.message ||
                error.toString()
          }
        )
  }
}
</script>

<style scoped>

</style>
