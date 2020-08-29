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
                <v-toolbar-title>Sign up for App-anno</v-toolbar-title>
                <v-spacer></v-spacer>
                <v-tooltip bottom>
                  <span>Source</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form
                  v-model="valid"
                  ref="form"
                  lazy-validation
                >
                  <v-text-field
                    v-model="firstname"
                    :rules="nameRules"
                    :counter="20"
                    label="First name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="lastname"
                    :rules="nameRules"
                    :counter="20"
                    label="Last name"
                    required
                  ></v-text-field>

                  <v-text-field
                    v-model="email"
                    :rules="emailRules"
                    label="E-mail"
                    required
                  ></v-text-field>

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
              <v-alert v-if="success" type="success">
                {{success}}
              </v-alert>
              <div v-if="errors.length">
                <v-alert v-for="(error, index) in errors" :key="index" type="error">
                  {{error}}
                </v-alert>
              </div>
              <v-card-actions class="d-flex justify-center">
                <div class="d-flex flex-column">
                    <v-btn :disabled="!valid" @click="register" text color="primary">
                      Register
                    </v-btn>
                    <v-btn @click="$router.go(-1)" text color="error">Cancel</v-btn>
                </div>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
</template>

<script>

export default {
  name: 'Register',

  data: () => ({
    valid: true,
    errors: [],
    success: '',
    showPassword: false,
    firstname: '',
    lastname: '',
    nameRules: [
      (v) => !!v || 'Name is required',
      (v) => v.length <= 20 || 'Name must be less than 20 characters',
    ],
    email: '',
    emailRules: [
      (v) => !!v || 'E-mail is required',
      (v) => /.+@.+/.test(v) || 'E-mail must be valid',
    ],
    username: '',
    usernameRules: [
      (v) => !!v || 'Username is required',
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
    async register() {
      const that = this;
      this.errors = [];
      this.success = '';

      if (!this.$refs.form.validate()) {
        console.log('Not all fields validated!');
        return;
      }
      this.$auth.signUpWithCredentials({
        email: this.email,
        password: this.password,
        username: this.username,
        given_name: this.firstname,
        family_name: this.lastname,
        name: `${this.firstname} ${this.lastname}`,
      }, (err) => {
        if (err) {
          const message = err.policy ? err.policy : `Error with code ${err.code}`;
          that.errors.push(message);
          return;
        }
        this.$router.push('/login');
      });
    },
  },
  computed: {
  },
};
</script>
