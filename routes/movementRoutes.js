const express = require('express');
const router = express.Router();
const { registrarMovimentacao, listarMovimentacoes } = require('../controllers/movementController');

// Rotas de movimentações
router.post('/movimentacoes', registrarMovimentacao);
router.get('/movimentacoes', listarMovimentacoes);

module.exports = router;
