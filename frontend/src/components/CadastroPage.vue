<template>
  <v-container fluid class="cadastro-page">
    <v-row align="center" justify="center">
      <v-col cols="12" md="4">
        <v-card elevation="8" class="pa-5">
          <v-card-title class="text-h5">Criar Conta</v-card-title>
          <v-card-subtitle>Preencha os dados para se cadastrar</v-card-subtitle>

          <v-form @submit.prevent="criarConta" class="mt-4">
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

            <v-text-field
              label="Nome"
              v-model="nome"
              required
              prepend-icon="mdi-account-box"
              outlined
            ></v-text-field>

            <v-select
              v-model="nivelAcesso"
              :items="nivelAcessoOpcoes"
              label="Nível de Acesso"
              required
              prepend-icon="mdi-shield-account"
              outlined
            ></v-select>

            <v-btn color="primary" type="submit" class="mt-4" block>Criar Conta</v-btn>
          </v-form>

          <v-divider class="my-4"></v-divider>

          <div v-if="erroMensagem" class="error-message text-center mt-2">
            <p>{{ erroMensagem }}</p>
          </div>

          <div class="text-center mt-4">
            <p>Já tem uma conta?</p>
            <v-btn @click="goToLogin" color="secondary" block outlined>
              Entrar
            </v-btn>
          </div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      login: '',
      senha: '',
      nome: '',
      nivelAcesso: 'user',
      erroMensagem: '',
      nivelAcessoOpcoes: [
        { text: 'Admin', value: 'admin' },
        { text: 'User', value: 'user' }
      ]
    };
  },
  methods: {
    async criarConta() {
      try {
        const response = await axios.post('http://localhost:3000/api/users/create', {
          login: this.login,
          senha: this.senha,
          nome: this.nome,
          nivelAcesso: this.nivelAcesso,
        });

        if (response.status === 201) {
          alert('Conta criada com sucesso!');
          window.location.href = 'http://localhost:8080/#/login';
        }
      } catch (error) {
        console.error(error);
        this.erroMensagem = error.response ? error.response.data.message : 'Erro ao criar a conta';
      }
    },
    goToLogin() {
      this.$router.push('/login');
    }
  }
};
</script>

<style scoped>
.cadastro-page {
  min-height: 100vh;
  background: linear-gradient(135deg, #f5f7fa, #c3cfe2);
  display: flex;
  align-items: center;
  justify-content: center;
}

.error-message {
  color: red;
}
</style>
