import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import { isAuthenticated } from '@/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false },
    props: { isRegister: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: LoginView,
    meta: { requiresAuth: false },
    props: { isRegister: true },
  },
  {
    path: '/home',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
  },
  {
    path: '/recipes',
    name: 'Recipes',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/RecipesView.vue'),
  },
  {
    path: '/authors',
    name: 'Authors',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AuthorsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  if (!isAuthenticated() && to.meta.requiresAuth) {
    if (from.name === 'Login') {
      return { name: 'Register' };
    }
    return { name: 'Login' };
  } else if (isAuthenticated() && !to.meta.requiresAuth) {
    return { name: 'Home' };
  }

  return true;
});

export default router;
