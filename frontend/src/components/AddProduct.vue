<template>
  <v-container>
    <!-- Formulário para adicionar produto -->
    <v-form @submit.prevent="addProduct">
      <v-text-field v-model="nome" label="Nome" required></v-text-field>
      <v-text-field v-model="descricao" label="Descrição" required></v-text-field>
      <v-text-field v-model="quantidade" label="Quantidade" type="number" required></v-text-field>
      <v-btn type="submit" color="primary">Adicionar Produto</v-btn>
    </v-form>

    <!-- Botão para logout -->
    <v-btn @click="logout" color="red">Logout</v-btn>
  </v-container>
</template>

<script>
import api from '../axios';

export default {
  data() {
    return {
      nome: '',
      descricao: '',
      quantidade: 0,
    };
  },
  methods: {
    // Método para adicionar produto
    async addProduct() {
      try {
        const response = await api.post('/api/produtos', {
          nome: this.nome,
          descricao: this.descricao,
          quantidade: this.quantidade,
        });
        this.$emit('product-added', response.data); // Emite um evento para o componente pai
        this.resetForm();
      } catch (error) {
        console.error('Error adding product:', error);
      }
    },
    // Resetar o formulário
    resetForm() {
      this.nome = '';
      this.descricao = '';
      this.quantidade = 0;
    },
    // Método para fazer o logout
    logout() {
      // Remove o token do localStorage e redireciona para a página de login
      localStorage.removeItem('token');
      this.$router.push('/login');  // Redireciona para a página de login
    }
  },
};
</script>
