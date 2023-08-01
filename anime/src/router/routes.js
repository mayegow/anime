
const routes = [
  // {
  //   path: '/',
  //   component: () => import('layouts/MainLayout.vue'),
  //   children: [
  //     { path: '', component: () => import('pages/IndexPage.vue') }
  //   ]
  // },
  {
    path: "/",
    component: () => import("pages/AnimeFind.vue"),
    name: "AnimeFind",
    children: [
      { path: "/data", component: () => import("layouts/MasterPage.vue") },
    ],
  },
  {
    path: "/result",
    component: () => import("pages/AnimeFound.vue"),
    name: "AnimeFound",
    children: [
      { path: "/data", component: () => import("layouts/MasterPage.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '/:catchAll(.*)*',
    component: () => import('pages/ErrorNotFound.vue')
  }
]

export default routes
