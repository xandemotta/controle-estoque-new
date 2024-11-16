<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <add-product @product-added="fetchProducts" />
      </v-col>
      <v-col cols="12" md="6">
        <product-list :products="products" />
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
    async fetchProducts() {
      try {
        const response = await api.get('/api/produtos');
        this.products = response.data; // Atualiza a lista de produtos
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    },
  },
  created() {
    this.fetchProducts(); // Carrega os produtos quando o componente é criado
  },
};
</script>
