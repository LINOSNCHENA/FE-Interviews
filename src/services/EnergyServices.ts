
const url = 'data/data.json'

class EnergyServices {
  async getDataFromJsons(): Promise<any[] | undefined> {
    try {
      const response = await fetch(url);
      const serverTroopers = await response.json();
      const trooperClients = serverTroopers;
      return trooperClients;
    } catch (e) {
      console.error('An error occurred retrieving the new troopers from ' + url, e)
    }
  }
}

export default new EnergyServices();
