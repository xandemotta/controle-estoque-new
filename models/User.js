const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequelize = require('../config/db');

class User extends Model {
  // Método para verificar a senha
  async verificarSenha(senha) {
    return bcrypt.compare(senha, this.senha); // Compara a senha fornecida com o hash armazenado
  }
}

User.init({
  login: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nivelAcesso: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'User',
  
  // Hook para garantir que a senha seja criptografada antes de salvar no banco
  hooks: {
    beforeCreate: async (user) => {
      if (user.senha) {
        user.senha = await bcrypt.hash(user.senha, 10); // Criptografa a senha com bcrypt antes de salvar
      }
    },
    beforeUpdate: async (user) => {
      if (user.senha) {
        user.senha = await bcrypt.hash(user.senha, 10); // Criptografa a senha com bcrypt antes de salvar
      }
    },
  },
});

module.exports = User;
