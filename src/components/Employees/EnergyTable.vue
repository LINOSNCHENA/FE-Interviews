<template>
  <div>
    <h1>JSON Data</h1>
    <pre>{{ jsonData }}</pre>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import EnergyServices from '../../services/EnergyServices';

// Define a reactive reference for storing JSON data
const jsonData = ref<any>(null);

// Fetch data when the component is mounted
onMounted(async () => {
  try {
    // Call the getDataFromJsons method to fetch JSON data
    const data = await EnergyServices.getDataFromJsons();
    
    // Update the state with the fetched data
    if (data) {
      jsonData.value = data;
    } else {
      console.error('No data found.');
    }
  } catch (error) {
    console.error('An error occurred while fetching the JSON data:', error);
  }
});
</script>

<style scoped>
/* Add your styles here */
</style>
