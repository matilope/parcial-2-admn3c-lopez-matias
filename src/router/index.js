import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/productos',
    name: 'productos',
    component: () => import('../views/ProductsView.vue')
  },
  {
    path: '/producto/:id',
    name: 'producto',
    component: () => import('../views/ProductView.vue')
  },
  {
    path: '/carrito',
    name: 'carrito',
    component: () => import('../views/CarritoView.vue')
  },
  {
    path: '/inicio-sesion',
    name: 'Inicio de sesión',
    component: () => import('../views/SessionView.vue')
  },
  {
    path: '/mi-cuenta',
    name: 'Mi cuenta',
    component: () => import('../views/AccountView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/crear-producto',
    name: 'Crear producto',
    component: () => import('../views/CreateProductView.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/editar-producto/:id',
    name: 'Editar producto',
    component: () => import('../views/EditProductView.vue'),
    meta: { requiresAuth: true }
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth) {
    if (localStorage.getItem('token')) {
      next()
    } else {
      next('/inicio-sesion')
    }
  } else {
    next()
  }
})

export default router
