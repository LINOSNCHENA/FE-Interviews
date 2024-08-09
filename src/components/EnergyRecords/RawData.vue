<template>
  <v-container class="json-container">
    <h1>JSON Data {{ recordselect }} out of {{ records }} Records</h1>
    <v-row>
      <v-col cols="8" md="4">
        <v-text-field label="Start Date" v-model="startDate" type="date" bg-color="teal"></v-text-field>
      </v-col>
      <v-col cols="8" md="4">
        <v-text-field label="End Date" v-model="endDate" type="date" bg-color="teal"></v-text-field>
      </v-col>

      <v-col cols="8" md="4">
        <v-btn @click="filterData" width="400px" height="50px" color="teal">Filter Data</v-btn>
      </v-col>
    </v-row>
    <pre class="json-pre">{{ filteredJsonData }}</pre>
  </v-container>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from "vue";
import EnergyServices from "../../services/EnergyServices";

const jsonData = ref<any>(null);
const filteredJsonData = ref<any>(null);

const startDate = ref<string>(formatDate(new Date()));
const endDate = ref<string>(formatDate(new Date()));

const records = computed(() => Object.keys(jsonData.value || {}).length);
const recordselect = computed(
  () => Object.keys(filteredJsonData.value || {}).length
);

// Utility function to format date as 'YYYY-MM-DD'
function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

onMounted(async () => {
  try {
    const data = await EnergyServices.getDataFromJsons();
    if (data) {
      jsonData.value = data["Time Series (Daily)"];
      filteredJsonData.value = jsonData.value; // Show all records initially
    } else {
      console.error("No data found.");    }
  } catch (error) {
    console.error("An error occurred while fetching the JSON data:", error);
  }
});


function filterData() {
  if (new Date(endDate.value).getTime() <= new Date(startDate.value).getTime()) {
    alert("End date must be later than the start date.");
    return;
  }

  filteredJsonData.value = filterRecordsByDateRange(
    jsonData.value,
    startDate.value,
    endDate.value
  );
}

function filterRecordsByDateRange(data: { [x: string]: any; }, start: string | number | Date, end: string | number | Date) {
  const startTime = start ? new Date(start).getTime() : 0;
  const endTime = end ? new Date(end).getTime() : new Date().getTime();

  return Object.keys(data)
    .filter((date) => {
      const dateTime = new Date(date).getTime();
      return dateTime >= startTime && dateTime <= endTime;
    })
    .reduce((result, date) => {
      result[date] = data[date];
      return result;
    }, {});
}
</script>

<style scoped>
.json-container {
  max-width: 100vw;
  margin: 20px auto;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  font-family: Arial, sans-serif;
  color: #333;
  margin-bottom: 20px;
  text-align: center;
}

.json-pre {
  font-family: Consolas, "Courier New", Courier, monospace;
  font-size: 14px;
  line-height: 1.6;
  background-color: #2e2e2e;
  color: #f1f1f1;
  padding: 15px;
  border-radius: 6px;
  overflow-x: auto;
}
</style>
