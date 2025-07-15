import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/home-view.vue'
import TodoView from '../views/to-do.vue'

export enum RouteName {
  HOME = 'home',
  TODOLIST = 'toDoList'
}

const routes = [
  {
    path: '/',
    name: RouteName.HOME,
    component: HomeView,
  },
  {
    path: '/to-do',
    name: RouteName.TODOLIST,
    component: TodoView
  }

]

const router = createRouter({
  history: createWebHistory(),
  routes,
});
export default router

