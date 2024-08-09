<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">

import { onMounted, ref } from "vue";
import { Bar } from "vue-chartjs";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  ChartOptions,
  ChartData,
} from "chart.js";
import EnergyServices from "../../services/EnergyServices";
// Register chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const wholeData = ref<any>(null);
const EnergyData = ref<any>(null);
const metaData = ref<any>(null);

const dailyRecords = ref(0);
const wholeRecords = ref(0);
const metaRecords = ref(0);

onMounted(async () => {
  try {
    const data = await EnergyServices.getDataFromJsons();

    // Update the state with the fetched data
    if (data) {
      wholeData.value = data;
      EnergyData.value = data["Time Series (Daily)"];
      metaData.value = data["Meta Data"];
      // Count items in EnergyData
      if (EnergyData.value) {
        dailyRecords.value = Object.keys(EnergyData.value).length;
        wholeRecords.value = Object.keys(wholeData.value).length;
        metaRecords.value = Object.keys(metaData.value).length;
      }

      console.log(wholeData.value);
      console.log(EnergyData.value);
      console.log(metaData.value);

      console.log(dailyRecords.value);
      console.log(wholeRecords.value);
      console.log(metaRecords.value);

      // Extract dates and closing prices from EnergyData
      const timeSeries = EnergyData.value;
      const labels = Object.keys(timeSeries).reverse();
      const filteredDataPoints = Object.values(timeSeries)
        .map((entry: any) => parseFloat(entry["4. close"]))
        .reverse(); // Closing prices
      chartData.value = {
        labels: labels,
        datasets: [
          {
            label:
              `Closing Prices Data |  Objects Found ` +
              String(wholeRecords.value) +
              ` | Days Elapsed  ` +
              String(dailyRecords.value),
            backgroundColor: "#42A5F5",
            data: filteredDataPoints,
          },
        ],
      };
    } else {
      console.error("No data found.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the JSON data:", error);
  }
});

// Define chartData outside of onMounted so it's available in the template
const chartData = ref<ChartData<"bar">>({
  labels: [],
  datasets: [
    {
      label: "Closing xxPrices" && String(wholeRecords.value),
      backgroundColor: "#42A5F5",
      data: [],
    },
  ],
});

// Define chart options
const chartOptions = ref<ChartOptions<"bar">>({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) =>
          `${tooltipItem.dataset.label}: ${tooltipItem.raw}`,
      },
    },
  },
  scales: {
    y: {
      beginAtZero: true,
    },
  },
});


</script>

<style lang="scss" scoped>
.chart-container {
  width: 100vw; 
  height: 98vh; 
  padding: 1rem; 
  background-color: #72817e;
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto; 

  canvas {
    max-width: 90%; 
    max-height: 95%; 
    border: 5px solid #00ff37;
    border-radius: 8px;
  }
}
</style>
