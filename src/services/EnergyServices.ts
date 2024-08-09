import { Family } from "../types/InterfaceX";

//const url = './data.json'
const url = 'data/data.json'

class EnergyServices {
  async getDataFromJsons(): Promise<any[] | undefined> {
    try {
    const response = await fetch(url)
    const serverTroopers = await response.json()
    const trooperClients = serverTroopers
      console.log('===========| TYPE-Questioned-13|============')
      console.log(trooperClients)
    return trooperClients
  } catch (e) {
    console.error('An error occurred retrieving the new troopers from ' + url, e)
  }
}

  private static map(benefits: Family): Family {
    return {
      id: benefits.id,
      namex: benefits.namex,
      gender: benefits.gender,
      cbenefits: benefits.cbenefits, // Custom field

      created: benefits.created,
      updated: benefits.updated,
    } as Family;
  }
}

export default new EnergyServices();
