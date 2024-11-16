import Vue from 'vue';
import VueRouter from 'vue-router';
import HomePage from '../views/HomePage.vue';
import LoginPage from '../components/LoginPage.vue'; // Certifique-se de importar corretamente
import CadastroPage from '../components/CadastroPage.vue'; // Importe o componente CadastroPage

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: HomePage, 
    meta: { requiresAuth: true }  // Página protegida
  },
  {
    path: '/login',
    name: 'Login',
    component: LoginPage,
    meta: { requiresAuth: false }  // Login não requer autenticação
  },
  {
    path: '/cadastro',  // Nova rota para cadastro
    name: 'Cadastro',
    component: CadastroPage,  // Component de cadastro
    meta: { requiresAuth: false }  // Não requer autenticação
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const token = localStorage.getItem('token');
  if (to.matched.some(record => record.meta.requiresAuth) && !token) {
    next('/login');  // Se a rota requer autenticação e o token não existe, redireciona para login
  } else if (to.name === 'Login' && token) {
    next('/');  // Se já estiver logado, redireciona para a home
  } else {
    next();  // Permite a navegação para outras rotas
  }
});


export default router;
