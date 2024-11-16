<template>
  <div>
    <h2>Criar Conta</h2>
    <form @submit.prevent="criarConta">
      <div>
        <label for="login">Login:</label>
        <input type="text" v-model="login" id="login" required />
      </div>
      <div>
        <label for="senha">Senha:</label>
        <input type="password" v-model="senha" id="senha" required />
      </div>
      <div>
        <label for="nome">Nome:</label>
        <input type="text" v-model="nome" id="nome" required />
      </div>
      <div>
        <label for="nivelAcesso">Nível de Acesso:</label>
        <select v-model="nivelAcesso" id="nivelAcesso" required>
          <option value="admin">Admin</option>
          <option value="user">User</option>
        </select>
      </div>
      <button type="submit">Criar Conta</button>
    </form>

    <div v-if="erroMensagem" class="error-message">
      <p>{{ erroMensagem }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Certifique-se de que axios está configurado corretamente

export default {
  data() {
    return {
      login: '',
      senha: '',
      nome: '',
      nivelAcesso: 'user', // valor padrão
      erroMensagem: ''
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
          this.$router.push('/login'); // Redireciona o usuário para a página de login
        }
      } catch (error) {
        console.error(error);
        this.erroMensagem = error.response ? error.response.data.message : 'Erro ao criar a conta';
      }
    }
  }
};
</script>

<style scoped>
.error-message {
  color: red;
}
</style>
