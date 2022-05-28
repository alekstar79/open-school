import { createRouter, createWebHistory } from 'vue-router'
import { routes, publicPages } from './routes'

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  const authRequired = !publicPages.includes(to.path)
  const loggedIn = localStorage.getItem('user')

  if (authRequired && !loggedIn) {
    next('/login')
  } else {
    next()
  }
})

export default router
