<template>
<v-app>
<v-main>
  <v-container fluid>
    <router-view />
  </v-container>
</v-main>
</v-app>
</template>

<script>

export default {
  name: 'App',

  components: {
  },

  data: () => ({
    //
  }),
};
</script>

<style>
  @import './assets/styles/reactiveText.css';
  @import './assets/styles/main.css';
</style>
