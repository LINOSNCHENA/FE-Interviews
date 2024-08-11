import { defineStore } from "pinia";
interface EnergyState {
  loading: boolean;
  dateStamp: string | null;
  energy: any[];
}

export const useEnergyStore = defineStore("energyStore", {
  state: (): EnergyState => ({
    loading: false,
    energy: [],
    dateStamp: null,
  }),

  actions: {
    async fetchEnergy() {
      const url =
        "https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=AAPL&apikey=YOUR_API_KEY";
      try {
        const response = await fetch(url);
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        this.energy = data; // Update the ref with the fetched data
      } catch (error) {
        console.error("Error fetching energy data:", error);
      }
    },
  },

  getters: {
    loadedEnergy(state): any[] {
      return state.energy;
    },
  },
});
