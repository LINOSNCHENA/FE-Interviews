import { defineStore } from "pinia";
import { Family, Salary } from "../types/InterfaceX";

// Dummy data
const salariesData: Salary[] = [
  {
    id: 1,
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
        gender: "Famale",
      },
      {
        id: 2,
        namex: "Alfred",
        created: new Date(),
        updated: new Date(),
        gender: "famale",
      },
      {
        id: 3,
        namex: "Leon",
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
    discounted: 5,
  },
  {
    id: 2,
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
        relations: "spouse",
        created: new Date(),
        updated: new Date(),
        gender: "Male",
      },
      {
        id: 2,
        namex: "Eve",
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
  {
    id: 3,
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
    children: 90,
    grosspay: 90,
    paycheck: 90,
    costBenefits: 90,
    discounted: 55,
  },
  {
    id: 4,
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
    error: null,
    families: [] as Family[],
    salaries: [] as Salary[],
    discounted: [] as Family[],
  }),

  actions: {
    fetchSalaries() {
      this.salaries = salariesData;
    },

    fetchFamilies() {
      this.families = this.loadedSalaries.flatMap(
        (x: { families: any }) => x.families
      );
    },

    fetchDiscounted() {
      console.log(this.loadedSalaries);
      const kids = this.loadedSalaries.flatMap(
        (salaryRecord: Salary) => salaryRecord.families
      );

      console.log(kids);
      this.discounted = kids.filter((family: Family) =>
        family.namex.startsWith("A")
      );
    },

    updateOrAddBenefits(unit: Salary) {
      console.log("Backed ");
      try {
        if (unit.id !== undefined) {
          const index = this.salaries.findIndex(
            (salary: { id: any }) => salary.id === unit.id
          );
          if (index === -1) return { error: "Unit not found" };
          this.salaries.splice(index, 1, unit);
          console.log(`Updated unit with ID: ${unit.id}`);
        } else {
          unit.id = this.salaries.length
            ? Math.max(
              ...this.salaries.map((salary: { id: any }) => salary.id!)
            ) + 1
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
