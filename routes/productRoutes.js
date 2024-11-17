const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Ou o caminho correto para o modelo
const { adicionarProduto, atualizarProduto, listarProdutos } = require('../controllers/productController');

// Rotas de produtos
router.post('/', adicionarProduto);  // Mudamos para "/produtos" no arquivo principal
// Atualizar um produto existente
// Atualizar um produto existente
router.put('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nome, descricao, quantidade } = req.body;

    // Verifica se o produto existe
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produto não encontrado' });
    }

    // Atualiza os dados do produto
    await product.update({ nome, descricao, quantidade });

    // Retorna o produto atualizado
    return res.status(200).json({
      message: 'Produto atualizado com sucesso',
      product, // Retorna o produto atualizado
    });
  } catch (error) {
    console.error('Erro ao atualizar produto:', error);
    return res.status(500).json({ message: 'Erro interno do servidor' });
  }
});

  
router.get('/', listarProdutos);
// Rota para excluir um produto
router.delete('/:id', async (req, res) => {
    try {
      const productId = req.params.id;
      const product = await Product.destroy({
        where: { id: productId }
      });
      if (product) {
        return res.status(200).json({ message: 'Produto excluído com sucesso' });
      } else {
        return res.status(404).json({ message: 'Produto não encontrado' });
      }
    } catch (err) {
      console.error('Erro ao excluir produto:', err);
      return res.status(500).json({ message: 'Erro interno do servidor' });
    }
  });
module.exports = router;
