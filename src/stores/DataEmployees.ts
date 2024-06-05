import { defineStore } from "pinia";
import { Family, Salary } from "@/types/InterfaceX";

// Dummy data
const salariesData: Salary[] = [
  {
    id: 1,
    namex: "Presly",
    numberx: "1234567890",
    emailx: "alice@example.com",
    periodMonth: "January",
    periodYear: 2024,
    created: new Date(),
    updated: new Date(),
    families: [
      {
        id: 1,
        namex: "Nikolas",
        dependant: "Yes",
        created: new Date(),
        updated: new Date(),
        gender: "Famale",
      },
      {
        id: 2,
        namex: "Alfred",
        dependant: "Yes",
        created: new Date(),
        updated: new Date(),
        gender: "famale",
      },
      {
        id: 3,
        namex: "Loen",
        dependant: "Yes",
        created: new Date(),
        updated: new Date(),
        gender: "Famale",
      },
    ],
    marriage: "Yes",
    children: 0,
    grosspay: 0,
    paycheck: 0,
    costBenefits: 0,
    discounted: 55,
  },
  {
    id: 2,
    namex: "Katerina",
    numberx: "0987654321",
    emailx: "bob@example.com",
    periodMonth: "February",
    periodYear: 2024,
    created: new Date(),
    updated: new Date(),
    families: [
      {
        id: 1,
        namex: "Gabriel",
        dependant: "Yes",
        relations: "spouse",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
      {
        id: 2,
        namex: "Eve",
        dependant: "Yes",
        relations: "child",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
    ],
    marriage: "No",
    children: 90,
    grosspay: 90,
    paycheck: 90,
    costBenefits: 90,
    discounted: 55,
  },
];

interface EmployeeState {
  loading: boolean;
  dateStamp: string | null;
  error: string | null;
  families: Family[];
  salaries: Salary[];
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
    error: null,
    families: [] as Family[],
    salaries: [] as Salary[],
  }),

  actions: {
    fetchSalaries() {
      this.salaries = salariesData;
    },

    fetchFamilies() {
      this.families = this.loadedSalaries.flatMap(
        (x) => x.families,
      );
      console.log(this.families);
    },

    updateOrAddBenefits(unit: Salary) {
      console.log("Backed ");
      try {
        if (unit.id !== undefined) {
          const index = this.salaries.findIndex(
            (salary) => salary.id === unit.id,
          );
          if (index === -1) return { error: "Unit not found" };
          this.salaries.splice(index, 1, unit);
          console.log(`Updated unit with ID: ${unit.id}`);
        } else {
          unit.id = this.salaries.length
            ? Math.max(...this.salaries.map((salary) => salary.id!)) + 1
            : 1;
          this.salaries.push(unit);
          console.log(`Added new unit with ID: ${unit.id}`);
        }
        return {};
      } catch (error) {
        console.error("Error updating or adding benefit:", error);
        return { error: error };
      }
    },

    addSalary(salary: Salary) {
      this.salaries.push(salary);
    },
  },

  getters: {
    loadedSalaries(state): Salary[] {
      return state.salaries;
    },
    loadedFamilies(state): Family[] {
      return state.families;
    },
  },
});
