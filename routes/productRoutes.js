const express = require('express');
const router = express.Router();
const { adicionarProduto, atualizarProduto, listarProdutos } = require('../controllers/productController');

// Rotas de produtos
router.post('/', adicionarProduto);  // Mudamos para "/produtos" no arquivo principal
router.put('/:id', atualizarProduto);
router.get('/', listarProdutos);

module.exports = router;
