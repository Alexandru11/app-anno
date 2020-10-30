import Vue from 'vue';
import JQuery from 'jquery';
import App from './App.vue';
import router from './router';
import store from './store';
import vuetify from './plugins/vuetify';
import { domain, clientId, databaseName } from '../auth_config.json';
import { Auth0Plugin } from './auth';

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
