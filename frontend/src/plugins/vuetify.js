import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
    dark: false, // Define se o tema padrão será escuro ou claro
    themes: {
      dark: {
        primary: '#1E1E1E', // Cor primária do tema escuro
        secondary: '#FF4081', // Cor secundária
        background: '#121212', // Cor de fundo do tema escuro
      },
      light: {
        primary: '#FFFFFF', // Cor primária do tema claro
        secondary: '#03A9F4', // Cor secundária
        background: '#FAFAFA', // Cor de fundo do tema claro
      }
    }
  }
});
