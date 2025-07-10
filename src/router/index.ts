import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TodoView from '../views/ToDo.vue'

const routes = [
  { path: '/', name: 'Home', component: HomeView },
  { path: '/todo', name: 'Todo', component: TodoView }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

