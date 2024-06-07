
import { useEmployeeStore } from "../stores/DataEmployees";
import { Family } from "../types/InterfaceX";

class BenefitServices {
  async getDiscountedRecords(): Promise<Family[] | undefined> {
    const storeData = useEmployeeStore();
    storeData.fetchDiscounted();
    try {
      const benefits = storeData.loadedDiscounted;
      const childBenefits = benefits
        .filter((benefits: Family) => benefits.id !== null)
        .map(BenefitServices.map);
      return childBenefits;
    } catch (e) {
      console.error("An error occurred retrieving data", e);
    }
  }

  async getTotalRecords(): Promise<Number | undefined> {
    const storeData = useEmployeeStore();
    storeData.fetchDiscounted();
    try {
      const childrenDiscounted = storeData.loadedDiscounted.length;
      return childrenDiscounted;
    } catch (e) {
      console.error("An error occurred retrieving data", e);
    }
  }

  private static map(benefits: Family): Family {
    return {
      id: benefits.id,
      namex: benefits.namex,
      gender: benefits.gender,
      created: benefits.created,
      updated: benefits.updated,
    } as Family;
  }
}

export default new BenefitServices();
