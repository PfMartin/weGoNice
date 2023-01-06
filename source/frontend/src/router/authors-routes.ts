export default [
  {
    path: 'overview',
    name: 'AuthorsOverview',
    component: () =>
      import(
        /* webpackChunkName: "authorsOverview" */ '@/views/AuthorsOverview.vue'
      ),
    meta: { requiresAuth: true },
  },
  {
    path: 'create',
    name: 'AuthorsCreate',
    component: () =>
      import(
        /* webpackChunkName: "authorsCreate" */ '@/views/AuthorsCreate.vue'
      ),
    meta: { requiresAuth: true },
  },
  {
    path: ':id',
    name: 'AuthorDetail',
    component: () =>
      import(
        /* webpackChunkName: "authorsDetail" */ '@/views/AuthorsDetail.vue'
      ),
    meta: { requiresAuth: true },
  },
];
