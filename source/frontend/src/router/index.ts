import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import LoginView from '../views/LoginView.vue';
import store from '../store';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/AboutView.vue'),
  },
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from) => {
  if (
    !store.getters.isAuthenticated &&
    !(to.name === 'Login' || to.name === 'Register')
  ) {
    if (from.name === 'Login') {
      return { name: 'Register' };
    }
    return { name: 'Login' };
  } else if (store.getters.isAuthenticated && to.name === 'Login') {
    return { name: 'Home' };
  }

  return true;
});

export default router;