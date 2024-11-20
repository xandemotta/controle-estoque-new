const Product = require('../models/Product');

// Adicionar novo produto ao inventário
const adicionarProduto = async (req, res) => {
  const { nome, descricao, quantidade } = req.body;
  try {
    const produto = await Product.create({ nome, descricao, quantidade });
    res.status(201).json(produto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao adicionar produto', err });
  }
};

// Atualizar informações de um produto
const atualizarProduto = async (req, res) => {
  const { id } = req.params;
  const { nome, descricao, quantidade } = req.body;
  try {
    const produto = await Product.findByPk(id);
    if (!produto) return res.status(404).json({ message: 'Produto não encontrado' });

    await produto.update({ nome, descricao, quantidade });
    res.status(200).json(produto);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao atualizar produto', err });
  }
};

// Listar todos os produtos no inventário
const listarProdutos = async (req, res) => {
  try {
    const produtos = await Product.findAll();
    res.status(200).json(produtos);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao listar produtos', err });
  }
};

module.exports = { adicionarProduto, atualizarProduto, listarProdutos };
