import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/test'
    },
    {
      path: '/test',
      component: () => import('@/views/test/index'),
      children: [
        {
          path: 'a',
          component: () => import('@/views/test/pageA')
        },
        {
          path: 'b',
          component: () => import('@/views/test/pageB')
        },
        {
          path: 'b/c',
          component: () => import('@/views/test/pageC')
        },
        {
          path: 'd',
          component: () => import('@/views/test/pageD')
        }
      ]
    }
  ]
})
