import { useEmployeeStore } from "../stores/DataEmployees";
import { Salary } from "../types/InterfaceX";

class EmployeeServices {
  async getBenefitsRecords(): Promise<Salary[] | undefined> {
    const storeData = useEmployeeStore();
    storeData.fetchSalaries();
    try {
      const benefits = storeData.loadedSalaries;
      const employeeBenefits = benefits
        .filter((benefits: Salary) => benefits.id !== null)
        .map(EmployeeServices.map);
      return employeeBenefits;
    } catch (e) {
      console.error("An error occurred retrieving data", e);
    }
  }

  async getTotalRecords(): Promise<Number | undefined> {
    const storeData = useEmployeeStore();
    storeData.fetchSalaries();
    try {
      const employeeTotals = storeData.loadedSalaries.length;
      return employeeTotals;
    } catch (e) {
      console.error("An error occurred retrieving data", e);
    }
  }

  private static map(benefits: Salary): Salary {
    return {
      id: benefits.id,
      namex: benefits.namex,     
      emailx: benefits.emailx,
      periodMonth: benefits.periodMonth,
      periodYear: benefits.periodYear,
      grosspay: benefits.grosspay,
      paycheck: benefits.paycheck,
      cbenefits: benefits.cbenefits,// 4
      
      created: benefits.created,
      updated: benefits.updated,
      marriage: benefits.marriage,
      children: benefits.children,
      discounted: benefits.discounted,
      families: benefits.families,

    } as Salary;
  }
}

export default new EmployeeServices();
