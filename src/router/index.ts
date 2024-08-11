import { createRouter, createWebHistory } from "vue-router";
import Login from "../pages/Login.vue";
import EnergyView from "../pages/Commodities/EnergyView.vue";
import JsonView from "../pages/Commodities/JsonView.vue";

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { requiresAuth: false },
    component: Login,
  },
  {
    path: "/commodities",
    name: "Commodities",
    meta: { requiresAuth: false },
    component: EnergyView,
  },
  {
    path: "/json",
    name: "Json",
    meta: { requiresAuth: false },
    component: JsonView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
