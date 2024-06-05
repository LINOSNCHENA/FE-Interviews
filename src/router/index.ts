import { createRouter, createWebHistory } from "vue-router";

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { requiresAuth: false },
    component: () => import("@/pages/Login.vue"),
  },
  {
    path: "/add-benefits",
    name: "Add-benefits",
    meta: { requiresAuth: false },
    component: () => import("@/pages/Manipulations/Add/BenefitsEntry.vue"),
  },
  {
    path: "/edit-benefits/:id",
    name: "Edit-benefits",
    meta: { requiresAuth: false },
    component: () => import("@/pages/Manipulations/Edit/BenefitsUpdate.vue"),
  },
  {
    path: "/employees",
    name: "Employees",
    meta: { requiresAuth: true },
    component: () => import("@/pages/Employees/AccountView.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
