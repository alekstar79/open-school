<template>
  <v-layout full-height>
    <v-container>
      <v-row justify="center">
        <v-col class="mt-3" cols="12">
          <img :src="currentLesson?.image" class="lesson-img" alt="" />
        </v-col>

        <v-col class="mt-7" cols="12">
          <h6 class="display-6 font-weight-bold">
            {{ currentLesson?.name }}
          </h6>

          <p class="subheading font-weight-regular">
            {{ currentLesson?.theme }}
          </p>

          <p>
            {{ currentLesson?.text }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </v-layout>
</template>

<script>
export default {
  name: 'LessonPage',

  computed: {
    currentLesson()
    {
      return this.$store.state.lessons.current
    },
    currentUser()
    {
      return this.$store.state.auth.user
    }
  },
  mounted()
  {
    if (!this.currentLesson) {
      this.$router.push(this.currentUser ? '/lessons' : '/login')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-container .v-row {
  .v-col {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    overflow: hidden;

    max-height: 300px;
    max-width: 80%;

    text-align: center;

    &+.v-col {
      max-height: unset;
    }
  }
  img {
    object-fit: cover;
    height: 100%;
    width: 100%;
  }
}
</style>
