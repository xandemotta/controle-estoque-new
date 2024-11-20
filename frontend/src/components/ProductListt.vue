<template>
    <v-container>
      <!-- Modal para editar produto -->
      <v-dialog v-model="dialog" max-width="500px">
        <v-card>
          <v-card-title>
            <span class="headline">Editar Produto</span>
          </v-card-title>
  
          <v-card-text>
            <v-form ref="form" v-model="valid">
              <v-text-field 
                v-model="editedProduct.nome" 
                label="Nome do Produto" 
                required
              />
              <v-text-field 
                v-model="editedProduct.descricao" 
                label="Descrição" 
                required
              />
              <v-text-field 
                v-model="editedProduct.quantidade" 
                label="Quantidade" 
                type="number" 
                required
              />
            </v-form>
          </v-card-text>
  
          <v-card-actions>
            <v-btn color="red" @click="dialog = false">Cancelar</v-btn>
            <v-btn 
              :disabled="!valid" 
              color="primary" 
              @click="updateProduct"
            >
              Atualizar
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
  
      <!-- Lista de produtos -->
      <v-list>
        <v-list-item-group>
          <v-list-item 
            v-for="product in localProducts" 
            :key="product.id"
          >
            <v-list-item-content>
              <v-list-item-title>{{ product.nome }}</v-list-item-title>
              <v-list-item-subtitle>{{ product.descricao }}</v-list-item-subtitle>
              <v-list-item-subtitle>Quantidade: {{ product.quantidade }}</v-list-item-subtitle>
            </v-list-item-content>
  
            <!-- Botões de edição e exclusão -->
            <v-list-item-action>
              <v-btn icon @click="editProduct(product)">
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
              <v-btn icon @click="deleteProduct(product.id)">
                <v-icon color="red">mdi-delete</v-icon>
              </v-btn>
            </v-list-item-action>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductList',
    props: {
      products: Array, // Não vamos mais alterar esta prop diretamente
    },
    data() {
      return {
        dialog: false, // Para controlar a exibição do modal
        editedProduct: {}, // Produto a ser editado
        valid: false, // Para validar o formulário
        localProducts: [...this.products], // Criar uma cópia local dos produtos
      };
    },
    watch: {
      // Quando a prop 'products' for alterada, atualize a lista local
      products(newProducts) {
        this.localProducts = [...newProducts];
      }
    },
    methods: {
      // Abre o modal de edição e preenche os campos com os dados do produto
      editProduct(product) {
        this.editedProduct = { ...product }; // Cria uma cópia do produto para edição
        this.dialog = true; // Abre o modal
      },
  
      // Atualiza o produto no banco de dados
      async updateProduct() {
        try {
          console.log('Produto a ser atualizado:', this.editedProduct); // Log do produto antes da atualização
  
          // Requisição PUT para atualizar o produto usando o 'id'
          const response = await axios.put(`http://localhost:3000/api/produtos/${this.editedProduct.id}`, {
            nome: this.editedProduct.nome,
            descricao: this.editedProduct.descricao,
            quantidade: this.editedProduct.quantidade,
          });
  
          console.log('Resposta do backend após atualização:', response.data); // Log da resposta do backend
  
          // Verifica se o produto atualizado foi retornado no campo 'product'
          const updatedProduct = response.data.product || response.data;
  
          // Atualiza a lista de produtos local no frontend com base no 'id'
          const index = this.localProducts.findIndex(product => product.id === updatedProduct.id);
          if (index !== -1) {
            // Substitui o produto atualizado na lista local
            this.localProducts[index] = updatedProduct;
          }
  
          this.dialog = false; // Fecha o modal após atualização
        } catch (error) {
          console.error('Erro ao atualizar o produto:', error);
          // Exibe uma mensagem de erro para o usuário
          alert('Erro ao atualizar o produto. Tente novamente mais tarde.');
        }
      },
  
      // Função para excluir produto
      deleteProduct(productId) {
        this.$emit('delete-product', productId); // Emite o evento de exclusão para o componente pai
      },
    },
  };
  </script>
  