import { createRouter, createWebHistory } from "vue-router";

import Login from '@/pages/Login.vue';
import BenefitsEntry from '@/pages/Manipulations/Add/BenefitsEntry.vue';
import BenefitsUpdate from '@/pages/Manipulations/Edit/BenefitsUpdate.vue';
import AccountView from '@/pages/Employees/AccountView.vue';
import RegistrationView from '@/pages/Employees/Registration.vue';

const routes = [
  {
    path: "/",
    name: "Login",
    meta: { requiresAuth: false },
    component: Login,
  },
  {
    path: "/add-benefits",
    name: "Add-benefits",
    meta: { requiresAuth: false },
    component: BenefitsEntry,
  },
  {
    path: "/edit-benefits/:id",
    name: "Edit-benefits",
    meta: { requiresAuth: false },
    component: BenefitsUpdate,
  },
  {
    path: "/employees",
    name: "Employees",
    meta: { requiresAuth: false },
    component: AccountView,
  },

  {
    path: "/registraion",
    name: "Registration",
    meta: { requiresAuth: false },
    component: RegistrationView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
