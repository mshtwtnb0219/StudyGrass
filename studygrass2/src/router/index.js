import { createRouter, createWebHistory } from 'vue-router'
import RegisterComponent from  '../components/RegisterComponent.vue'
import HomeComponent from  '../components/HomeComponent.vue'
import LoginComponent from '../components/LoginComponent.vue'

//ルーティング設定
const routes = [
  {
     path: '/',
     name: 'login',
     component:LoginComponent
  } ,
  {
    path: '/home',
    name: 'home',
    component:HomeComponent
  } ,
  {
    path: '/register',
    name: 'RegisterComponent',
    component: RegisterComponent
  },

]
const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router



