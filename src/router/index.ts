import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/identity',
      name: 'identity',
      component: () => import('@/views/HomeView.vue'),
    },
    {
      path: '/identity/login',
      name: 'login',
      component: () => import('@/views/LoginView.vue'),
    },
    {
      path: '/identity/member',
      name: 'member',
      component: () => import('@/views/MemberView.vue'),
    },
    {
      path: '/identity/member/movie',
      name: 'movie',
      component: () => import('@/views/movie/MemberMovieView.vue'),
    },
    {
      path: '/identity/member/admin',
      name: 'admin',
      component: () => import('@/views/admin/MemberAdminView.vue'),
    },
    {
      path: '/identity/member/profile',
      name: 'profile',
      component: () => import('@/views/profile/MemberProfileView.vue'),
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('@/views/NotFoundView.vue'),
    },
  ],
})

export default router
