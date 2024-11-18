const jwt = require('jsonwebtoken');

const authMiddleware = (req, res, next) => {
  // Extrair o token do cabeçalho 'Authorization', retirando o 'Bearer '.
  const token = req.headers['authorization']?.replace('Bearer ', '');
  console.log("Token recebido:", token);  // Log para verificar o token

  if (!token) {
    return res.status(403).json({ message: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: 'Token inválido' });
    }

    req.userId = decoded.id;
    req.userNivelAcesso = decoded.nivelAcesso;
    next();
  });
};

module.exports = authMiddleware;
