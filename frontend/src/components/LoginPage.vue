<template>
  <v-container fluid class="login-page">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card elevation="8" class="pa-5">
          <v-card-title class="text-h5">Login</v-card-title>
          <v-card-subtitle>Entre com suas credenciais</v-card-subtitle>

          <v-form @submit.prevent="submitLogin" class="mt-4">
            <v-text-field
              label="Login"
              v-model="login"
              required
              prepend-icon="mdi-account"
              outlined
            ></v-text-field>

            <v-text-field
              label="Senha"
              v-model="senha"
              type="password"
              required
              prepend-icon="mdi-lock"
              outlined
            ></v-text-field>

            <v-btn color="primary" type="submit" class="mt-4" block>Entrar</v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div class="text-center">
            <p>Ainda não tem uma conta?</p>
            <v-btn @click="goToCadastro" color="secondary" block outlined>
              Cadastrar
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import api from '@/axios';

export default {
  data() {
    return {
      login: '', // Variável para o login
      senha: '' // Variável para a senha
    };
  },
  methods: {
    async submitLogin() {
      try {
        console.log('Enviando dados para o backend:', this.login, this.senha);

        const response = await api.post(
          '/api/auth/login',
          { login: this.login, senha: this.senha },
          { headers: { 'Content-Type': 'application/json' } }
        );

        if (response.data.token) {
          localStorage.setItem('token', response.data.token);
          this.$router.push('/');
        } else {
          alert('Erro no login: Token não retornado');
        }
      } catch (err) {
        console.error('Erro ao fazer login:', err.response ? err.response.data : err);
        alert('Credenciais incorretas ou erro de conexão');
      }
    },

    goToCadastro() {
      this.$router.push('/cadastro');
    }
  }
};
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
