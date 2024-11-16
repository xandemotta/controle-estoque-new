<template>
  <v-list>
    <v-list-item-group>
      <v-list-item v-for="product in products" :key="product.id">
        <v-list-item-content>
          <v-list-item-title>{{ product.nome }}</v-list-item-title>
          <v-list-item-subtitle>{{ product.descricao }}</v-list-item-subtitle>
          <!-- Exibindo a quantidade de produtos -->
          <v-list-item-subtitle>Quantidade: {{ product.quantidade }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>
    </v-list-item-group>
  </v-list>
</template>

<script>
export default {
  name: 'ProductList',
  props: {
    products: Array, // Recebe os produtos do componente pai
  },
};
</script>
