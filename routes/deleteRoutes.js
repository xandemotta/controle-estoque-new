const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Importa o modelo Product

// Rota para deletar um produto pelo ID
router.delete('/api/produtos/:id', async (req, res) => {
  const { id } = req.params;

  try {
    // Tenta encontrar o produto pelo ID
    const product = await Product.findByPk(id);

    // Verifica se o produto existe
    if (!product) {
      return res.status(404).json({ error: 'Produto não encontrado' });
    }

    // Exclui o produto
    await product.destroy();

    // Responde com uma mensagem de sucesso
    res.json({ message: 'Produto excluído com sucesso' });
  } catch (error) {
    console.error('Erro ao excluir o produto:', error);
    res.status(500).json({ error: 'Erro ao excluir o produto' });
  }
});

module.exports = router;
