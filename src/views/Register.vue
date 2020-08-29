<template>
  <v-app>
    <v-main>
      <Register/>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import Register from '@/components/Register.vue';

export default {
  name: 'register',
  components: {
    Register,
  },
};
</script>
