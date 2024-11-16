<template>
  <div>
    <form @submit.prevent="submitLogin">
      <div>
        <label for="login">Login:</label>
        <input type="text" v-model="login" id="login" required />
      </div>
      <div>
        <label for="senha">Senha:</label>
        <input type="password" v-model="senha" id="senha" required />
      </div>
      <button type="submit">Entrar</button>
    </form>

    <!-- Botão para redirecionar para a página de Cadastro -->
    <div>
      <p>Ainda não tem uma conta?</p>
      <v-btn @click="goToCadastro" color="primary">Cadastrar</v-btn>
    </div>
  </div>
</template>

<script>
import api from '@/axios'; // Caminho correto para o arquivo src/axios.js

export default {
  data() {
    return {
      login: '',  // Variável para o login
      senha: ''   // Variável para a senha
    };
  },
  methods: {
  async submitLogin() {
    try {
      console.log('Enviando dados para o backend:');
      console.log('Login:', this.login);
      console.log('Senha:', this.senha);

      // Envia a requisição de login
      const response = await api.post('/api/auth/login', {
        login: this.login,
        senha: this.senha
      }, 
      {
        headers: { 'Content-Type': 'application/json' }
      });

      console.log('Resposta do backend:', response.data);

      // Verifica se o token foi retornado na resposta
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);  // Armazena o token no localStorage
        this.$router.push('/home');  // Redireciona para a página principal
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
