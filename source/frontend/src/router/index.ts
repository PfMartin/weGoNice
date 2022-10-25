import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import { isAuthenticated } from '@/auth';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/login',
    name: 'Login',
    component: LoginView,
    props: { isRegister: false },
  },
  {
    path: '/register',
    name: 'Register',
    component: LoginView,
    props: { isRegister: true },
  },
  {
    path: '/home',
    name: 'Home',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/HomeView.vue'),
  },
  {
    path: '/recipes',
    name: 'Recipes',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/RecipesView.vue'),
  },
  {
    path: '/authors',
    name: 'Authors',
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AuthorsView.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  console.log(isAuthenticated());
  if (!isAuthenticated() && !(to.name === 'Login' || to.name === 'Register')) {
    if (from.name === 'Login') {
      return { name: 'Register' };
    }
    return { name: 'Login' };
  } else if (
    isAuthenticated() &&
    (to.name === 'Login' || to.name === 'Register')
  ) {
    return { name: 'Home' };
  }

  return true;
});

export default router;
