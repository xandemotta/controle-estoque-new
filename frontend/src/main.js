import Vue from 'vue';
import App from './App.vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';
import router from './router';

Vue.config.productionTip = false;

// Inicializa o Vuetify com a configuração de tema
Vue.use(Vuetify);

const vuetify = new Vuetify({
  theme: {
    dark: false, // Define o tema padrão (false para claro, true para escuro)
    themes: {
      dark: {
        primary: '#2196F3', // Azul para o tema escuro (Lua)
        secondary: '#03A9F4', // Azul claro para o tema escuro
        background: '#121212', // Cor de fundo do tema escuro
        accent: '#03A9F4', // Cor de destaque do tema escuro
      },
      light: {
        primary: '#FFEB3B', // Amarelo para o tema claro (Sol)
        secondary: '#FF9800', // Laranja para complementar o tema claro
        background: '#FAFAFA', // Cor de fundo do tema claro
        accent: '#FF5722', // Destaque laranja para o tema claro
      }
    }
  }
});

new Vue({
  render: (h) => h(App),
  router,
  vuetify,  // Passa a configuração do Vuetify
}).$mount('#app');
