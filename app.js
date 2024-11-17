// app.js
const express = require('express');
require('dotenv').config();
const cors = require('cors'); // Importe o CORS
const sequelize = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const editRoutes = require('./routes/deleteRoutes');
const movementRoutes = require('./routes/movementRoutes');
const authMiddleware = require('./middleware/authMiddleware'); // Corrija o caminho se necessário
const authRoutes = require('./routes/authRoutes'); // Importe a rota de autenticação

const app = express();

// Habilite o CORS para todas as origens ou para uma origem específica
app.use(cors({
  origin: 'http://localhost:8080', // Permite requisições do frontend rodando na porta 8080
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());

// Use as rotas corretamente
app.use('/api/auth', authRoutes); // Deixe esta rota para login
app.use('/api/users', userRoutes);  // Criação de usuário deve ser em '/api/users'

// Rotas protegidas (com middleware de autenticação)
app.use('/api/produtos', authMiddleware, productRoutes);
app.use('/api/movimentacoes', authMiddleware, movementRoutes);
app.use('/api/delete', authMiddleware, editRoutes);

// Rota de Logout
app.post('/api/auth/logout', (req, res) => {
  // Aqui, você pode limpar o token no backend, mas com JWT, o token é apenas removido no frontend.
  // Caso você esteja usando cookies, é possível limpar o cookie também.
  
  res.clearCookie('access_token');  // Se o token estiver armazenado em um cookie
  res.status(200).json({ message: 'Logout realizado com sucesso' });
});

// Sincronizando o banco de dados
sequelize.sync()
  .then(() => console.log('Banco de dados sincronizado'))
  .catch(err => console.error('Erro ao sincronizar banco de dados:', err));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
