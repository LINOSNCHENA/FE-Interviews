

import { useEmployeeStore } from "@/stores/DataEmployees";
import { Salary } from "@/types/InterfaceX";

class BenefitServices {
  async getDiscountedRecords(): Promise<Salary[] | undefined> {
    const storeData = useEmployeeStore();


    storeData.fetchDiscounted();
    try {
      const benefits = storeData.loadedDiscounted;
      const childBenefits = benefits
        .filter((benefits: Salary) => benefits.id !== null)
        .map(BenefitServices.map);
      return childBenefits;
    } catch (e) {
      console.error("An error occurred retrieving data", e);
    }
  }

  async getTotalRecords(): Promise<Number | undefined> {
    const storeData = useEmployeeStore();
    storeData.fetchSalaries();
    try {
      const childrenDiscounted = storeData.loadedDiscounted.length;
      return childrenDiscounted;
    } catch (e) {
      console.error("An error occurred retrieving data", e);
    }
  }

  private static map(benefits: Salary): Salary {
    return {
      id: benefits.id,
      namex: benefits.namex,
      numberx: benefits.numberx,
      emailx: benefits.emailx,
      periodMonth: benefits.periodMonth,    
      periodYear: benefits.periodYear,

      grosspay: benefits.grosspay,
      paycheck: benefits.paycheck,
      costBenefits: benefits.costBenefits,
      created: benefits.created,
      updated: benefits.updated,

      marriage: benefits.marriage,
      children: benefits.children,
      discounted: benefits.discounted,
      families: benefits.families, 
    } as Salary;
  }
}

export default new BenefitServices();
