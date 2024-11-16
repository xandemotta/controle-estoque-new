import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router';

Vue.config.productionTip = false;

Vue.use(Vuetify);  // Certifique-se de chamar Vue.use(Vuetify)

new Vue({
  render: (h) => h(App),
  router,
  vuetify: new Vuetify(),  // Inicialize o Vuetify corretamente aqui
}).$mount('#app');
