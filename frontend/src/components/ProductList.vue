<template>
  <v-container>
    <!-- Botão para alternar entre tema claro e escuro -->
    <v-btn @click="toggleDarkMode" color="primary" class="mb-4">
      Alternar Tema
    </v-btn>

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
export default {
  name: 'ProductList',
  props: {
    products: Array, // Lista de produtos recebida do componente pai
  },
  data() {
    return {
      dialog: false, // Controle do modal
      editedProduct: {}, // Produto a ser editado
      valid: false, // Validação do formulário
      localProducts: [...this.products], // Copia local da lista de produtos
    };
  },
  watch: {
    // Atualiza a lista local quando a prop 'products' mudar
    products(newProducts) {
      this.localProducts = [...newProducts];
    }
  },
  methods: {
    // Abre o modal de edição e preenche os campos com os dados do produto
    editProduct(product) {
      this.editedProduct = { ...product }; // Cria uma cópia do produto
      this.dialog = true; // Abre o modal
    },

    // Emite o evento para o componente pai para atualizar o produto
    updateProduct() {
      this.$emit('update-product', this.editedProduct); // Emite o evento
      this.dialog = false; // Fecha o modal
    },

    // Emite o evento de exclusão para o componente pai
    deleteProduct(productId) {
      this.$emit('delete-product', productId); // Emite o evento de exclusão
    },

    // Alterna entre tema escuro e claro
    toggleDarkMode() {
      const currentTheme = this.$vuetify.theme.dark;
      this.$vuetify.theme.dark = !currentTheme; // Alterna o valor do tema
    },
  },
};
</script>

<style scoped>
/* Estilo adicional pode ser adicionado aqui se necessário */
</style>
