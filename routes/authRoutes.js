// authRoutes.js (backend)
const express = require('express');
const bcrypt = require('bcrypt');  // Para comparar senhas
const jwt = require('jsonwebtoken'); // Para gerar o token
const User = require('../models/User'); // O modelo do usuário (ajuste conforme necessário)
const router = express.Router();

router.post('/login', async (req, res) => {
    const { login, senha } = req.body;
  
    if (!login || !senha) {
      return res.status(400).json({ error: 'Login e senha são obrigatórios' });
    }
  
    try {
      // Encontre o usuário com base no login
      const user = await User.findOne({ where: { login } });
  
      // Se o usuário não for encontrado, retorna um erro
      if (!user) {
        return res.status(400).json({ error: 'Usuário não encontrado' });
      }
  
      console.log('Senha fornecida:', senha);  // Log para verificar a senha fornecida
      console.log('Senha armazenada (hash):', user.senha); // Verificando o hash da senha
  
      // Compare a senha fornecida com a senha armazenada (criptografada)
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
  
      if (isPasswordValid) {
        return res.status(400).json({ error: 'Senha inválida' });
      }
  
      // Crie o token JWT
      const token = jwt.sign({ id: user.id, nome: user.nome }, process.env.JWT_SECRET, { expiresIn: '1h' });
  
      return res.json({ token }); // Retorna o token para o frontend
  
    } catch (err) {
      console.error('Erro no login:', err);
      return res.status(500).json({ error: 'Erro interno ao tentar fazer login' });
    }
  });

module.exports = router;
