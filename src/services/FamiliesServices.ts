import { useEmployeeStore } from "../stores/DataEmployees";
import { Family } from "../types/InterfaceX";

class FamiliesServices {
  async getFamilyRecords(): Promise<Family[] | undefined> {
    const storeData = useEmployeeStore();
    storeData.fetchFamilies();
    try {
      const benefits = storeData.loadedFamilies;
      const employeeBenefits = benefits
        .filter((benefits: Family) => benefits.id !== null)
        .map(FamiliesServices.map);
      return employeeBenefits;
    } catch (e) {
      console.error("An error occurred retrieving data", e);
    }
  }

  async getTotalRecords(): Promise<Number | undefined> {
    const storeData = useEmployeeStore();
    storeData.fetchFamilies();
    try {
      const employeeTotals = storeData.loadedFamilies.length;
      return employeeTotals;
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

export default new FamiliesServices();
