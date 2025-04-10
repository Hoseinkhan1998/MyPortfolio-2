import { createRouter, createWebHistory } from "vue-router";
import HomePage from "../components/HomePage/HomePage.vue";
// import TaskModule from "../components/Modules/TaskModule.vue";

const routes = [
  { path: "/", component: HomePage, name: "home" },
  // { path: "/task-module", component: TaskModule, name: "task-module" },  
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;