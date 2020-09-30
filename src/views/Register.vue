<template>
  <v-app>
    <v-main>
      <RegisterComponent/>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import RegisterComponent from '@/components/Register.vue';

export default {
  name: 'Register',
  components: {
    RegisterComponent,
  },
};
</script>
