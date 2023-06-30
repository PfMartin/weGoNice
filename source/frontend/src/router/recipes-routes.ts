export default [
  {
    path: 'overview',
    name: 'RecipesOverview',
    component: () =>
      import(
        /* webpackChunkName: "recipesOverview" */ '@/views/RecipesOverview.vue'
      ),
    meta: { requiresAuth: true },
  },
  {
    path: 'create',
    name: 'RecipesCreate',
    component: () =>
      import(
        /* webpackChunkName: "recipesCreate" */ '@/views/RecipesCreate.vue'
      ),
    meta: { requiresAuth: true },
  },
  {
    path: ':id',
    name: 'RecipesDetail',
    component: () =>
      import(
        /* webpackChunkName: "recipesDetail" */ '@/views/RecipesDetail.vue'
      ),
    meta: { requiresAuth: true },
  },
];
