<template>
  <div class="chart-container">
    <v-row class="date-row" no-gutters>
      <v-col cols="12" md="4">
        <v-text-field label="Start Date" v-model="startDate" type="date" class="compact-text-field"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-text-field label="End Date" v-model="endDate" type="date" class="compact-text-field"></v-text-field>
      </v-col>
      <v-col cols="12" md="4">
        <v-btn @click="updateChartData" class="update-btn" width="20vw" height="50px">Update MaxMin</v-btn>
      </v-col>
    </v-row>
    <div class="chart-wrapper">
      <Bar :data="chartData" :options="chartOptions" />
    </div>
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


const EnergyData = ref<any>(null);
  const wholeData = ref<any>(null);


// Define chartData and chartOptions
const chartData = ref<ChartData<"bar">>({
  labels: [],
  datasets: [
    {
      label: "Closing Prices",
      backgroundColor: "#42A5F5",
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
      EnergyData.value = data["Time Series (Daily)"];
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
    .reverse(); 


  chartData.value = {
    labels: labels,
    datasets: [
      {
        label: `Closing Prices | Total Records: ${Object.keys(wholeData.value["Time Series (Daily)"] || {}).length} | Filtered Records: ${Object.keys(filteredData).length}`,
        backgroundColor: "#42A5F5",
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

<style scoped>

.chart-container {
  display: flex;
  flex-direction: column;
  height: 83vh;
  width: 100vw;
  background-color: #f9f9f9;
  padding: 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.date-row {
  align-items: center;
  margin-bottom: 1rem;
  flex: 0 1 auto;
  justify-content: space-between;
}

.v-text-field,
.v-btn {
  margin: 0 5px;
}


.update-btn {
  width: 30vw;
  height: 60vh;
  background-color: rgb(148, 190, 32);
  color: #fff;
  font-weight: bold;
  max-width: 30vw;
  max-height: 60vh;
}

.chart-wrapper {
  flex: 1 1 auto;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: rgb(168, 111, 25);
  height: 60px;
}

.chart-wrapper canvas {
  width: 100% !important;
  height: 100% !important;
  border-radius: 8px;
  background-color: #42f5b0;
}

.text-field-container {
  margin: 0;
  padding: 0;
}

.compact-text-field {
  width: 250px;

  .v-input__control {
    padding: 0;
    background-color: #f5f5f5;
  }

  .v-input__slot {
    border: 1px solid #42A5F5;
    border-radius: 4px;
  }

  .v-label {
    font-size: 0.9rem;
    color: #42A5F5;
  }

  .v-text-field__slot {
    font-size: 0.875rem;
    color: #333;
  }

  .v-text-field__input {
    padding: 8px 12px;
  }
}
</style>
