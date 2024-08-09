<template>
  <div>
    <h1>JSON Data</h1>
    <pre>{{ jsonData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
import EnergyServices from "../../services/EnergyServices";
const jsonData = ref<any>(null);

onMounted(async () => {
  try {
    const data = await EnergyServices.getDataFromJsons();

    if (data) {
      jsonData.value = data;
      const stockData = data["Time Series (Daily)"];
      const newestThreeRecords = Object.keys(stockData)
        .sort((a, b) => new Date(b).getTime() - new Date(a).getTime())
        .slice(0, 5)
        .reduce((result, date) => {
          result[date] = stockData[date];
          return result;
        }, {});

      jsonData.value = newestThreeRecords;

      console.log(newestThreeRecords);
    } else {
      console.error("No data found.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the JSON data:", error);
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
