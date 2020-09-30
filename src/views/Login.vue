<template>
  <v-app>
    <v-main>
      <LoginComponent/>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import LoginComponent from '@/components/Login.vue';

export default {
  name: 'Login',
  components: {
    LoginComponent,
  },
};
</script>
