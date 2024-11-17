<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <add-product @product-added="fetchProducts" />
      </v-col>
      <v-col cols="12" md="6">
        <product-list 
          :products="products" 
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
      products: [], // Armazena os produtos
    };
  },
  methods: {
    // Método para buscar produtos
    async fetchProducts() {
      try {
        const response = await api.get('/api/produtos');
        this.products = response.data; // Atualiza a lista de produtos
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
      }
    },
    // Método para excluir o produto
    async handleDeleteProduct(productId) {
      try {
        // Chamada para API para excluir o produto no backend
        await api.delete(`/api/produtos/${productId}`);
        
        // Atualiza a lista local removendo o produto excluído
        this.products = this.products.filter(product => product.id !== productId);
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
      }
    },
  },
  created() {
    this.fetchProducts(); // Carrega os produtos quando o componente é criado
  },
};
</script>
