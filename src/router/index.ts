
import { createRouter, createWebHistory } from "vue-router";
import Login from '../pages/Login.vue';
import BenefitsEntry from '../pages/Manipulations/Add/BenefitsEntry.vue';
import BenefitsUpdate from '../pages/Manipulations/Edit/BenefitsUpdate.vue';
import AccountView from '../pages/Employees/AccountView.vue';
import EnergyView from '../pages/Commodities/EnergyView.vue';

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
    path: "/commodities",
    name: "Commodities",
     meta: { requiresAuth: false },
    component: EnergyView,
  },


];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
