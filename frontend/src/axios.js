import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000/',  // Endereço do seu backend
  headers: {
    'Content-Type': 'application/json',
  }
});

// Adiciona o token JWT ao cabeçalho de todas as requisições
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Armazene o token após login
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => {
  return Promise.reject(error);
});

// Resposta de erro para verificação de token expirado ou outros erros
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // Token expirado ou não autorizado, pode redirecionar para login
      console.log('Token expirado ou não autorizado. Redirecionando para login...');
      // Aqui você pode adicionar o redirecionamento para a tela de login
    }
    return Promise.reject(error);
  }
);

export default api;
