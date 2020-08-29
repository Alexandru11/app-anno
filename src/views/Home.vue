<template>
  <v-app class="home">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll>
      <v-btn @click="logout" text color="gray" >Logout</v-btn>
    </v-app-bar>
    <v-main>
      <p>main app</p>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'Home',
  components: {
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$router.push('/login');
    },
  },
};
</script>
