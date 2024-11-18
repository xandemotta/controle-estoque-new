<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <add-product @product-added="fetchProducts" />
      </v-col>
      <v-col cols="12" md="6">
        <product-list 
          :products="products" 
          @update-product="handleUpdateProduct"
          @delete-product="handleDeleteProduct"
        />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import ProductList from '../components/ProductList.vue';
import AddProduct from '../components/AddProduct.vue';
import api from '../axios';

export default {
  name: 'HomePage',
  components: {
    ProductList,
    AddProduct,
  },
  data() {
    return {
      products: [], // Lista de produtos
    };
  },
  methods: {
    // Busca os produtos da API
    async fetchProducts() {
      try {
        const response = await api.get('/api/produtos');
        this.products = response.data; // Atualiza a lista de produtos
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },
    
    // Método para atualizar o produto no backend e atualizar a lista local
    async handleUpdateProduct(updatedProduct) {
      try {
        const response = await api.put(`/api/produtos/${updatedProduct.id}`, updatedProduct);
        
        // Atualiza o produto na lista local
        const index = this.products.findIndex(product => product.id === updatedProduct.id);
        if (index !== -1) {
          // Atualiza os dados localmente com a resposta do servidor
          this.products.splice(index, 1, response.data.product || response.data);
        }
      } catch (error) {
        console.error('Erro ao atualizar o produto:', error);
      }
    },

    // Método para excluir o produto
    async handleDeleteProduct(productId) {
      try {
        await api.delete(`/api/produtos/${productId}`);
        
        // Remove o produto da lista local
        this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
      }
    },
  },
  created() {
    this.fetchProducts(); // Carrega os produtos ao criar o componente
  },
};
</script>
