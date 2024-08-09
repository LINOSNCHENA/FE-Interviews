<template>
  <div class="chart-container">
    <Bar :data="chartData" :options="chartOptions" />
  </div>
  <pre>{{ jsonData }}</pre>

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
// import { useEnergyStore } from "../../stores/EnergyData";
import EnergyServices from "../../services/EnergyServices";

// Initialize reactive variables
const jsonData = ref<any>(null);
const energyRecords=ref(8);

// Define chartData outside of onMounted so it's available in the template
const chartData = ref<ChartData<"bar">>({
  labels: [],
  datasets: [
    {
      label: "Closing xxPrices" && String(energyRecords.value),
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

// Register chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

// Fetch data when the component is mounted
onMounted(async () => {
  try {
    // Call the getDataFromJsons method to fetch JSON data
    const data = await EnergyServices.getDataFromJsons();
    console.log(data);
    console.log("===================");    
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

<style lang="scss" scoped>
.chart-container {
  width: 100vw; // Full viewport width
  height: 80vh; // Fixed height for the chart
  padding: 1rem; // Padding around the chart
  background-color: #f9f9f9;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow-x: auto; // Enable horizontal scrolling if content overflows

  canvas {
    max-width: 100%; // Ensure canvas scales with the container
    border: 2px solid #007bff; /* Change boundary color here */
    border-radius: 8px; /* Optional: rounded corners */
  }
}
</style>
