import { createRouter, createWebHistory } from 'vue-router'
import homeView from '../views/home-view.vue'
import todoView from '../views/to-do.vue'
import taskList from '../views/task-list.vue'


const routes = [
  { path: '/', name: 'Home', component: homeView },
  { path: '/todo', name: 'Todo', component: todoView },
  { path: '/tasklist', name: 'TaskList', component: taskList}
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

