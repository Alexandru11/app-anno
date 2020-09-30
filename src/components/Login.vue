<template>
      <v-container
        class="fill-height"
        fluid
      >
        <v-row
          align="center"
          justify="center"
        >
          <v-col
            cols="12"
            sm="8"
            md="4"
          >
            <v-card class="elevation-12">
              <v-toolbar
                color="green"
                dark
                flat
              >
                <v-spacer></v-spacer>
                <v-toolbar-title>Log in to App-anno</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model="valid"
                  lazy-validation
                  ref="form"
                >
                  <v-text-field
                    v-model="username"
                    :rules="usernameRules"
                    label="Username"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="password"
                    :rules="passwordRules"
                    :type="showPassword ? 'text' : 'password'"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    @click:append="showPassword = !showPassword"
                    label="Password"
                    required
                  ></v-text-field>
                </v-form>
              </v-card-text>
              <div v-if="errors.length">
                <v-alert v-for="(error, index) in errors" :key="index" type="error">
                  {{error}}
                </v-alert>
              </div>
              <v-card-actions class="d-flex justify-center">
                <div class="d-flex flex-column text-center">
                    <v-btn :disabled="!valid" @click="login" text color="green" >
                      Login
                    </v-btn>
                    <v-btn @click="loginFB" text color="blue">
                      Login with Facebook
                    </v-btn>
                    <v-btn @click="loginG" text color="red">
                      Login with Google
                    </v-btn>
                    <v-chip :to="{ path: '/register' }" color="white"
                            text-color="blue" class="text-center">
                        Sign up for app-anno
                    </v-chip>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>

export default {
  name: 'LoginComponent',

  data: () => ({
    valid: false,
    errors: [],
    showPassword: false,
    username: '',
    usernameRules: [
      (v) => !!v || 'Username or Email is required',
    ],
    password: '',
    passwordRules: [
      (v) => !!v || 'Password is required',
    ],
  }),
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    login() {
      const router = this.$router;
      this.errors = [];
      if (!this.$refs.form.validate()) {
        console.log('Not all fields validated!');
        return;
      }
      this.$auth.login({
        username: this.username,
        password: this.password,
        responseType: 'token',
      }, (err, authResult) => {
        if (err) {
          this.errors.push(err.description);
          console.log(`Error message when logging in ${err}`);
          return;
        }
        if (authResult) localStorage.setItem('jwt', authResult.accessToken);
        // TOFIX Throws a redirect error because of this
        router.push('/');
      });
    },
    loginFB() {
      // console.log('been there done that');
      this.$auth.loginSocial({
        connection: 'facebook',
      });
    },
    loginG() {
      // console.log('been there done that');
      this.$auth.loginSocial({
        connection: 'google-oauth2',
      });
    },
  },
};
</script>
