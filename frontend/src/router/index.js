import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta: {
      auth:true
    }
  },
  {
    path: '/Signin',
    name: 'SignIn',
    component: () => import('../views/Signin.vue')
  },
  {
    path: '/Login',
    name: 'Login',
    component: () => import('../views/Login.vue')
  },
  {
    path: '/Newarticle',
    name: 'Newarticle',
    component: () => import('../views/NewArticle.vue'),
    meta: {
      auth:true
    }
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// authentificaion vérifiée ici :
router.beforeEach((to, from, next)=>{
  if(to.matched.some(record => record.meta.auth)){
    if(localStorage.getItem('token')==null){
      next({
        path:"/Login"
      })
    }else{
      next()
    }
  }else{
    next()
  }
})
export default router
