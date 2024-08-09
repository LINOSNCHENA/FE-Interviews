<template>
  <div class="chart-container">
    <v-row>
      <v-col cols="6" md="3">
        <v-text-field label="Start Date" v-model="startDate" type="date"></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-text-field label="End Date" v-model="endDate" type="date"></v-text-field>
      </v-col>
      <v-col cols="6" md="3">
        <v-btn @click="updateChartData" width="400px" height="60px">Update Chart</v-btn>
      </v-col>
    </v-row>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from "vue";
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

// Initialize state variables
const endDate = ref<string>(formatDate(new Date()));
const startDate = ref<string>(calculateStartDate(endDate.value));
  function calculateStartDate(endDate: string): string {
  const end = new Date(endDate);
  end.setDate(end.getDate() - 7);
  return formatDate(end);
}

const wholeData = ref<any>(null);
const EnergyData = ref<any>(null);
const metaData = ref<any>(null);

// Define chartData and chartOptions
const chartData = ref<ChartData<"bar">>({
  labels: [],
  datasets: [
    {
      label: "Closing Prices",
      backgroundColor: "red",
      //  backgroundColor: "#42A5F5",
      data: [],
    },
  ],
});

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

onMounted(async () => {
  try {
    const data = await EnergyServices.getDataFromJsons();

    if (data) {
      wholeData.value = data;
      EnergyData.value = data["Time Series (Daily)"];
      metaData.value = data["Meta Data"];
      updateChartData(); // Initialize chart data
    } else {
      console.error("No data found.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the JSON data:", error);
  }
});

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
}

function updateChartData() {
  if (new Date(endDate.value).getTime() <= new Date(startDate.value).getTime()) {
    alert("End date must be later than the start date.");
    return;
  }

  const filteredData = filterRecordsByDateRange(
    EnergyData.value,
    startDate.value,
    endDate.value
  );

  const labels = Object.keys(filteredData).reverse();
  const filteredDataPoints = Object.values(filteredData)
    .map((entry: any) => parseFloat(entry["4. close"]))
    .reverse(); // Closing prices

  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: `Closing Prices Data | Total Records: ${Object.keys(wholeData.value["Time Series (Daily)"] || {}).length} | Filtered Records: ${Object.keys(filteredData).length}`,
      //  backgroundColor: "yellow",
        //  backgroundColor: "#42A5F5",
        data: filteredDataPoints,
      },
    ],
  };
}

function filterRecordsByDateRange(data, start, end) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
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

<style lang="scss" scoped>
.chart-container {
  width: 100vw;
  height: 78vh;
  padding: 1rem;
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
