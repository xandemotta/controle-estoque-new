const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Caminho correto para o modelo de produto
const { adicionarProduto, atualizarProduto, listarProdutos } = require('../controllers/productController');

// Rota para adicionar um novo produto
router.post('/', adicionarProduto);

// Rota para listar todos os produtos
router.get('/', listarProdutos);

// Rota para buscar um produto por ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.findByPk(id);

    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    return res.status(200).json(product);
  } catch (error) {
    console.error('Erro ao buscar produto:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para atualizar um produto existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(`ID do produto capturado na requisição PUT: ${id}`);

    const { nome, descricao, quantidade } = req.body;

    if (!nome || !descricao || !quantidade) {
      return res.status(400).json({ message: 'Nome, descrição e quantidade são obrigatórios.' });
    }

    const product = await Product.findByPk(id);
    if (!product) {
      console.log(`Produto com ID ${id} não encontrado.`);
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    await product.update({ nome, descricao, quantidade });
    const updatedProduct = await Product.findByPk(id);

    console.log(`Produto com ID ${id} atualizado:`, updatedProduct);

    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      product: updatedProduct,
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

// Rota para excluir um produto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await Product.destroy({
      where: { id }
    });

    if (product) {
      return res.status(200).json({ message: 'Produto excluído com sucesso' });
    } else {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }
  } catch (error) {
    console.error('Erro ao excluir produto:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

module.exports = router;
