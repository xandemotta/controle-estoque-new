const express = require('express');
const User = require('../models/User');
const bcrypt = require('bcrypt');
const router = express.Router();

// Rota para criar um novo usuário
router.post('/create', async (req, res) => {
  const { login, senha, nome, nivelAcesso } = req.body;

  if (!login || !senha || !nome || !nivelAcesso) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios' });
  }

  try {
    // Verifica se o login já está em uso
    const userExists = await User.findOne({ where: { login } });
    if (userExists) {
      return res.status(400).json({ message: 'Login já em uso' });
    }

    // Criptografa a senha
    const hashedPassword = await bcrypt.hash(senha, 10);

    // Cria um novo usuário
    const user = await User.create({
      login,
      senha: hashedPassword,
      nome,
      nivelAcesso,
    });

    res.status(201).json({ message: 'Usuário criado com sucesso', user });
  } catch (err) {
    console.error('Erro ao criar usuário:', err);
    res.status(500).json({ message: 'Erro interno ao criar o usuário' });
  }
});

module.exports = router;
