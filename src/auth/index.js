import Vue from 'vue';
import auth0 from 'auth0-js';

let instance;

/** Returns the current instance of the SDK */
export const getInstance = () => instance;

/**
 *  Creates an instance of the Auth0 SDK.
 * If one has already been created, it returns that instance
 */
export const useAuth0 = ({
  redirectUri = window.location.origin,
  ...options
}) => {
  if (instance) return instance;

  // The 'instance' is simply a Vue object
  instance = new Vue({
    data() {
      return {
        loading: true,
        isAuthenticated: false,
        user: {},
        options: {
          clientId: options.clientId,
          domain: options.domain,
          connection: options.databaseName,
        },
        auth0Client: null,
        popupOpen: false,
        error: null,
      };
    },
    methods: {
      /** Authenticates the user using a popup window */
      async signUpWithCredentials(userInfo, cb) {
        userInfo.client_id = this.options.clientId;
        userInfo.connection = this.options.connection;

        await this.auth0Client.signup(userInfo, cb);
      },

      async login(credentials, cb) {
        credentials.realm = this.options.connection;

        try {
          await this.auth0Client.client.login(credentials, cb);
          this.setAuthenticationInfo(true);
        } catch (e) {
          this.error = e;
        }
      },

      async loginSocial(params) {
        params.responseType = 'token';
        params.redirect_uri = `${window.location.origin}`;
        params.client_id = this.options.clientId;

        try {
          await this.auth0Client.authorize(params);
          this.setAuthenticationInfo(true);
        } catch (e) {
          this.error = e;
        }
      },

      async logout(params = {}) {
        params.client_id = this.options.clientId;
        await this.auth0Client.logout(params);
        this.setAuthenticationInfo(false);
      },

      setAuthenticationInfo(value) {
        this.isAuthenticated = value;
        window.localStorage.setItem('isAuthenticated', value);
      },
    },
    /** Use this lifecycle method to instantiate the SDK client */
    async created() {
      // Create a new instance of the SDK client using members of the given options object
      this.auth0Client = new auth0.WebAuth({
        domain: options.domain,
        clientID: options.clientId,
        audience: options.audience,
        redirect_uri: redirectUri,
      });
    },
  });

  return instance;
};

// Create a simple Vue plugin to expose the wrapper object throughout the application
export const Auth0Plugin = {
  install(VueApp, options) {
    VueApp.prototype.$auth = useAuth0(options);
  },
};
