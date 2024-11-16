const Movement = require('../models/Movement');

// Registrar entrada ou saída de um produto no estoque
const registrarMovimentacao = async (req, res) => {
  const { tipo, quantidade, tecnico } = req.body;
  try {
    const movimentacao = await Movement.create({ tipo, quantidade, tecnico });
    res.status(201).json(movimentacao);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao registrar movimentação', err });
  }
};

// Listar todas as movimentações
const listarMovimentacoes = async (req, res) => {
  try {
    const movimentacoes = await Movement.findAll();
    res.status(200).json(movimentacoes);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar movimentações', err });
  }
};

module.exports = { registrarMovimentacao, listarMovimentacoes };
