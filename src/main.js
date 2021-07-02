import Vue from 'vue';
import JQuery from 'jquery';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import startServer from './mockserver/index';
import env from './utils/Env';
import config from './utils/authConfigs';
import { Auth0Plugin } from './auth';

const { domain, clientId, databaseName } = config;

if (env.isDevelopment) {
  startServer();
}

Vue.use({
  install() {
    Vue.prototype.$jQuery = JQuery; // you'll have this.$jQuery anywhere in your vue project
  },
});

Vue.use(Auth0Plugin, {
  domain,
  clientId,
  databaseName,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount('#app');
