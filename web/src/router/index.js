import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Main from '../views/Main.vue'
import Article from '../views/Article.vue'
import Hero from '../views/Hero.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Main,
    children: [
      {path: '/', name: 'home', component:Home},
      {path: '/articles/:id', name: 'article', component:Article, props:true},

    ]
  },
  {
    path: '/heroes/:id',props:true,
    name:'hero',
    component:Hero,

  }
]

const router = new VueRouter({
  routes
})

export default router