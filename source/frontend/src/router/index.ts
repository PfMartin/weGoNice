import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { isAuthenticated } from '@/auth';
import authorsRoutes from '@/router/authors-routes';
import recipesRoutes from '@/router/recipes-routes';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    meta: { requiresAuth: false, transition: 'slide-fade' },
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterView,
    meta: { requiresAuth: false, transition: 'slide-fade' },
  },
  {
    path: '/home',
    name: 'Home',
    meta: { requiresAuth: true },
    component: () =>
      import(/* webpackChunkName: "home" */ '@/views/HomeView.vue'),
    alias: '/',
  },
  {
    path: '/recipes',
    name: 'Recipes',
    meta: { requiresAuth: true },
    redirect: { name: 'RecipesOverview' },
    component: () =>
      import(/* webpackChunkName: "recipes" */ '@/views/RecipesView.vue'),
    children: recipesRoutes,
  },
  {
    path: '/authors',
    name: 'Authors',
    meta: { requiresAuth: true },
    redirect: { name: 'AuthorsOverview' },
    component: () =>
      import(/* webpackChunkName: "authors" */ '@/views/AuthorsView.vue'),
    children: authorsRoutes,
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
