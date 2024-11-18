<template>
  <v-app>
    <!-- Botão para alternar entre tema claro e escuro com ícone -->
    <v-btn
      @click="toggleDarkMode"
      class="theme-toggle-btn"
      fab
      absolute
      :color="buttonColor"
    >
      <v-icon :color="iconColor">{{ themeIcon }}</v-icon> <!-- O ícone muda dinamicamente -->
    </v-btn>

    <!-- Aqui é onde as rotas serão renderizadas -->
    <router-view></router-view>
  </v-app>
</template>

<script>
export default {
  name: 'App',
  computed: {
    // Computed property para determinar qual ícone mostrar com base no tema atual
    themeIcon() {
      return this.$vuetify.theme.dark ? 'mdi-moon-waning-crescent' : 'mdi-white-balance-sunny';
    },
    // Cor do ícone dependendo do tema
    iconColor() {
      return this.$vuetify.theme.dark ? 'blue' : 'yellow'; // Lua azul, Sol amarelo
    },
    // Cor do botão dependendo do tema
    buttonColor() {
      return this.$vuetify.theme.dark ? 'blue darken-2' : 'yellow darken-2'; // Botão azul ou amarelo
    }
  },
  methods: {
    // Método para alternar entre tema claro e escuro
    toggleDarkMode() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark; // Alterna o tema
    }
  }
};
</script>

<style scoped>
/* Estilos para o botão com ícone */
.theme-toggle-btn {
  position: fixed; /* Fixa o botão em uma posição */
  bottom: 16px;    /* Distância do botão do fundo */
  right: 16px;     /* Distância do botão da direita */
  border-radius: 50%; /* Torna o botão redondo */
  width: 56px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.2); /* Adiciona uma sombra */
}

.v-icon {
  font-size: 30px; /* Tamanho do ícone */
}
</style>
