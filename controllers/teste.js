const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');  // Importando bcrypt

// Função para cadastrar usuário
const cadastrarUsuario = async (req, res) => {
  const { login, senha, nome, nivelAcesso } = req.body;
  
  try {
    // Gerando o hash da senha antes de salvar no banco de dados
    const senhaHash = await bcrypt.hash(senha, 10); // O "10" é o número de rounds de salting
    
    const usuario = await User.create({ login, senha: senhaHash, nome, nivelAcesso });
    res.status(201).json(usuario);
  } catch (err) {
    console.error(err); // Para debug
    res.status(500).json({ message: 'Erro ao cadastrar usuário', error: err.message });
  }
};

// Função de login
const login = async (req, res) => {
  const { login, senha } = req.body;
  try {
    // Verifica se o usuário existe
    const usuario = await User.findOne({ where: { login } });
    if (!usuario) return res.status(404).json({ message: 'Usuário não encontrado' });

    console.log('Senha fornecida:', senha); // Log da senha fornecida
    console.log('Senha armazenada (hash):', usuario.senha); // Log do hash armazenado

    // Verificando a senha fornecida com o hash armazenado no banco
    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    console.log('Senha válida?', senhaValida); // Log do resultado da comparação

    if (!senhaValida) return res.status(400).json({ message: 'Senha incorreta' });

    // Gerando o token JWT
    const token = jwt.sign(
      { id: usuario.id, nivelAcesso: usuario.nivelAcesso }, 
      process.env.JWT_SECRET, 
      { expiresIn: '1h' } // O token expira em 1 hora
    );

    res.status(200).json({ token });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ message: 'Erro ao fazer login', error: err.message });
  }
};


module.exports = { cadastrarUsuario, login };
