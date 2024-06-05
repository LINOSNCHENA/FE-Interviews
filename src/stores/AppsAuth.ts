// Data-Securirity.ts

import { defineStore } from "pinia";

interface HealthAuthState {
  loading: boolean;
  error: string | null;
  rate: any;
}

export const useAuthStore = defineStore("authStore", {
  state: (): HealthAuthState => ({
    loading: false,
    error: null,
    rate: 0,
  }),

  actions: {
    async isAuthorized(user: string | undefined) {
      const enforcer = String(user);
      const authorizedEmails = [
        "test1@gmail.com",
        "test2@gmail.com",
        "test3@gmail.com",
      ];
      return authorizedEmails.includes(enforcer);
    },

    async isAuthorizedAdmin(user: string | undefined) {
      const enforcer = String(user);
      const authorizedEmails = [
        "test1@gmail.com",
      ];
      return authorizedEmails.includes(enforcer);
    },
  },

  getters: {
    loadedRates(state) {
      return state.rate;
    }
  }
});