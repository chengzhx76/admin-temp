import Vue from 'vue';
import App from './App';

import router from './router';
import store from './store';

import 'iview/dist/styles/iview.css';
import iView from 'iview';

import './mock'

Vue.use(iView);

Vue.config.productionTip = false;

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
});
