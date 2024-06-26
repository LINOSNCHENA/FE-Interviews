import { defineStore } from "pinia";
import { Family, Salary } from "../types/InterfaceX";

// Initial data
const salariesData: Salary[] = [
  {
    id: 11,
    namex: "Presly",
    emailx: "presly@gmail.com",
    periodMonth: "January",
    periodYear: 2024,
    created: new Date(),
    updated: new Date(),
    families: [
      {
        id: 1,
        namex: "Nikolas",
        created: new Date(),
        updated: new Date(),
        gender: "Female",
      },
      {
        id: 2,
        namex: "Alfred",
        created: new Date(),
        updated: new Date(),
        gender: "Female",
      },
      {
        id: 3,
        namex: "Leon",
        created: new Date(),
        updated: new Date(),
        gender: "Female",
      },
    ],
    marriage: "Yes",
    kids: 0,
    paycheck: 4000,
    cbenefits: 84,
    discounted: 5,
    cost: 0,
    balance: 0
  },
  {
    id: 22,
    namex: "Katerina",
    emailx: "katerina@moffat.com",
    periodMonth: "February",
    periodYear: 2024,
    created: new Date(),
    updated: new Date(),
    families: [
      {
        id: 1,
        namex: "Gabriel",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
      {
        id: 2,
        namex: "Eve",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
    ],
    marriage: "No",
    children: 0,
    grosspay: 90,
    paycheck: 4000,
    cbenefits: 85,
    discounted: 55,
    cost: 0,
    balance: 0
  },
  {
    id: 33,
    namex: "Theresa",
    emailx: "thresa@moffat.com",
    periodMonth: "May",
    periodYear: 2024,
    created: new Date(),
    updated: new Date(),
    families: [
      {
        id: 2,
        namex: "Albert",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
    ],
    marriage: "No",
    kids: 0,
    paycheck: 2000,
    cbenefits: 86,
    discounted: 55,
    cost: 0,
    balance: 0
  },
  {
    id: 44,
    namex: "Dauti",
    emailx: "dauti@james.com",
    periodMonth: "April",
    periodYear: 2023,
    created: new Date(),
    updated: new Date(),
    families: [
      {
        id: 1,
        namex: "Henry",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
      {
        id: 2,
        namex: "Alvin",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
    ],
    marriage: "No",
    kids: 0,
    paycheck: 4000,
    cbenefits: 87,
    discounted: 55,
    cost: 0,
    balance: 0
  },
];

interface EmployeeState {
  loading: boolean;
  dateStamp: string | null;
  salaries: Salary[];
  families: Family[];
  discounted: Family[];
}

export const useEmployeeStore = defineStore("employeeStore", {
  state: (): EmployeeState => ({
    loading: false,
    dateStamp: new Date().toLocaleString("en-ZM", {
      weekday: "long",
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: false,
    }),
    salaries: salariesData,
    families: [],
    discounted: [],
  }),

  actions: {
    async fetchSalaries() {
      try {
        this.salaries = salariesData;
      } catch (error) {
        console.error("Error fetching salaries:", error);
      }
    },

    async fetchFamilies() {
      try {
        this.families = this.salaries.flatMap((salary: { families: any; }) => salary.families);
      } catch (error) {
        console.error("Error fetching families:", error);
      }
    },

    async fetchDiscounted() {
      try {
        const kids = this.salaries.flatMap((salary: { families: any; }) => salary.families);
        this.discounted = kids.filter((family: { namex: string; }) => family.namex.startsWith("A"));
      } catch (error) {
        console.error("Error fetching discounted families:", error);
      }
    },

    updateOrAddBenefit(unit: Salary) {
      if (unit.id !== undefined) {
        return this.updateBenefit(unit);
      } else {
        return this.addBenefit(unit);
      }
    },
    updateBenefit(unit: Salary) {
      try {
        const index = this.salaries.findIndex((s: { id: number; }) => s.id === unit.id);
        // If index is -1, the unit was not found in the array
        if (index === -1) {
          console.error("Unit not found");
          return { error: "Unit not found" };
        }
        if (!unit || !unit.id) {
          console.error("Invalid unit structure");
          return { error: "Invalid unit structure" };
        }
        this.salaries[index] = { ...this.salaries[index], ...unit };
        return {};
      } catch (error) {
        console.error("Error updating benefit:", error);
        return { error: error.message || error };
      }
    },

    addBenefit(unit: Salary) {
      try {
        unit.id = this.salaries.length
          ? Math.max(...this.salaries.map((s: { id: any; }) => s.id)) + 1
          : 1;
        this.salaries.push(unit);
        return {};
      } catch (error) {
        console.error("Error adding benefit:", error);
        return { error: error.message || error };
      }
    },
  },

  getters: {
    loadedSalaries(state): Salary[] {
      return state.salaries;
    },
    loadedFamilies(state): Family[] {
      return state.families;
    },
    loadedDiscounted(state): Family[] {
      return state.discounted;
    },
  },
});
