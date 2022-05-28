<template>
  <v-layout full-height>
    <v-container>
      <v-row align="start">
        <v-col cols="3">
          <v-img
              id="profile-img"
              src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
              class="profile-img-card"
              alt=""
          />
        </v-col>

        <v-col v-if="currentUser">
          <h4 class="display-2 font-weight-bold mb-3">
            {{ currentUser.username }}
          </h4>

          <p class="subheading font-weight-regular">
            <strong>Token:</strong>
            {{ currentUser.accessToken.substring(0, 20) }} ... {{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}

            <br/>

            <strong>Id:</strong>
            {{ currentUser.id }}

            <br/>

            <strong>Authorities:</strong>
            {{ currentUser.role }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'ProfilePage',

  computed: {
    currentUser() {
      return this.$store.state.auth.user
    }
  },
  mounted()
  {
    if (!this.currentUser) {
      this.$router.push('/login')
    }
  }
}
</script>

<style scoped>

</style>
