import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'; 
import 'nprogress/nprogress.css';

const router = createRouter({ 
  history: createWebHistory(process.env.NODE_ENV === 'production' ? '/election/': ''),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../views/HomeView.vue'),
      meta: { requiresAuth: true },
    },
    {
      path: '/game',
      name: 'game',
      component: () => import('../views/GameView.vue'),
      meta: { requiresAuth: true }
    }
    ,
    {
      path: '/result',
      name: 'result',
      component: () => import('../views/ResultView.vue'),
      meta: { requiresAuth: true }
    },
  ]
})

router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach(() => {
  NProgress.done();
});

export default router
