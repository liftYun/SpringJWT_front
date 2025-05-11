import { createRouter, createWebHistory } from 'vue-router';
import Home from './components/HomeView.vue';
import Login from './components/LoginView.vue';
import Signup from './components/SignupView.vue';
import { isLoggedIn } from './services/auth';

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/login', name: 'Login', component: Login, meta: { guestOnly: true } },
  { path: '/signup', name: 'Signup', component: Signup, meta: { guestOnly: true } },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 게스트 전용 페이지 접근 방지
router.beforeEach((to, from, next) => {
  if (to.meta.guestOnly && isLoggedIn()) {
    return next('/');
  }
  next();
});

export default router;