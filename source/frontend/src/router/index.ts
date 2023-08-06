import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '@/views/LoginView.vue';
import RegisterView from '@/views/RegisterView.vue';
import { isAuthenticated, isTokenExpired } from '@/auth';
import { refreshToken } from '@/apis/weGoNice/auth';
import authorsRoutes from '@/router/authors-routes';
import recipesRoutes from '@/router/recipes-routes';
import { useStore } from 'vuex';

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
    path: '/recipes',
    name: 'Recipes',
    alias: '/',
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

router.beforeEach(async (to, from) => {
  if (!isAuthenticated() && to.meta.requiresAuth) {
    if (from.name === 'Login') {
      return { name: 'Register' };
    }
    return { name: 'Login' };
  } else if (isAuthenticated() && !to.meta.requiresAuth) {
    return { name: 'Recipes' };
  }

  if (isAuthenticated() && isTokenExpired()) {
    console.warn('refreshing Token');
    const refreshSuccess = await refreshToken();
    if (!refreshSuccess) {
      return { name: 'Login' };
    }
  }

  return true;
});

export default router;
