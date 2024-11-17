<template>
  <v-dialog v-model="localDialog" max-width="500px">
    <v-card>
      <v-card-title>
        <span class="headline">Editar Produto</span>
      </v-card-title>
      <v-card-text>
        <v-text-field v-model="editedProduct.nome" label="Nome do Produto" />
        <v-text-field v-model="editedProduct.descricao" label="Descrição" />
        <v-text-field v-model="editedProduct.quantidade" label="Quantidade" type="number" />
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text @click="cancelEdit">Cancelar</v-btn>
        <v-btn color="blue darken-1" text @click="submitEdit">Salvar</v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: 'EditProduct',
  props: {
    product: Object, // Recebe o produto a ser editado
    dialog: Boolean, // Controle do modal (aberto ou fechado)
  },
  data() {
    return {
      localDialog: this.dialog, // Usamos uma variável local para controlar o modal
      editedProduct: { ...this.product }, // Cópia do produto para edição
    };
  },
  watch: {
    // Sempre que o 'dialog' mudar no componente pai, atualiza o estado local do modal
    dialog(newVal) {
      this.localDialog = newVal;
    },
  },
  methods: {
    submitEdit() {
      // Emite o produto editado para o componente pai
      this.$emit('edit-product', this.editedProduct);
      this.$emit('update-dialog', false); // Emite evento para fechar o modal
    },
    cancelEdit() {
      this.$emit('update-dialog', false); // Emite evento para fechar o modal sem salvar
    },
  },
};
</script>
