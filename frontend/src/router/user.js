// routes/user.js
const express = require('express');
const router = express.Router();
const { User } = require('../models');  // Se você estiver usando Sequelize para definir o modelo

// Rota para criar um usuário
router.post('/create', async (req, res) => {
  const { login, senha, nome, nivelAcesso } = req.body;

  if (!login || !senha || !nome || !nivelAcesso) {
    return res.status(400).json({ message: 'Todos os campos são obrigatórios!' });
  }

  try {
    // Cria o novo usuário no banco
    const newUser = await User.create({
      login,
      senha,  // Lembre-se de tratar a senha antes de armazenar (por exemplo, usando bcrypt)
      nome,
      nivelAcesso,
    });

    return res.status(201).json({ message: 'Usuário criado com sucesso!', user: newUser });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Erro ao criar o usuário' });
  }
});

module.exports = router;
