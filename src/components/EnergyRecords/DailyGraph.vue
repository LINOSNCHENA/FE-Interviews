<template>
  <div class="chart-container">
    <v-row class="date-row" no-gutters>
      <v-col cols="12" md="4" class="start-date">
        <v-text-field label="Start Date" v-model="startDate" type="date" class="compact-text-field"
          variant="solo"></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="end-date">
        <v-text-field label="End Date" v-model="endDate" type="date" class="compact-text-field"
          variant="solo"></v-text-field>
      </v-col>
      <v-col cols="12" md="4" class="update-btn">
        <v-btn @click="updateChartData" class="update-btn" width="20vw" height="50px" variant="outlined">Update
          Daily</v-btn>
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
import AuthServices from "../../services/AuthServices";
import { useRouter } from "vue-router";


ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale
);

const endDate = ref<string>(formatDate(new Date()));
const startDate = ref<string>(calculateStartDate(endDate.value));
const router = useRouter();

function calculateStartDate(endDate: string): string {
  const end = new Date(endDate);
  end.setDate(end.getDate() - 90);
  return formatDate(end);
}

const wholeData = ref<any>(null);
const EnergyData = ref<any>(null);
const metaData = ref<any>(null);

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
    const user = await AuthServices.getUser();
    if (user === "None@gmail.com") {
      router.push({ name: "Login" });
    }
    if (data && user) {
      wholeData.value = data;
      EnergyData.value = data["Time Series (Daily)"];
      metaData.value = data["Meta Data"];
      updateChartData();
    } else {
      console.error("No data found.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the JSON data:", error);
  }
});

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
}

function updateChartData() {
  if (
    new Date(endDate.value).getTime() <= new Date(startDate.value).getTime()
  ) {
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
        label: `Closing Prices | Total Records: ${Object.keys(wholeData.value["Time Series (Daily)"] || {}).length
          } | Filtered Records: ${Object.keys(filteredData).length}`,
        backgroundColor: "monarch",
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

<style scoped lang="scss">
.chart-container {
  top: 0;
  display: flex;
  flex-direction: column;
  background-color: #f9f9f9;
  background: red;
  padding: auto;
  margin: auto;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  height: 83vh;
  max-width: 90vw;

  .date-row {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    max-width: 80vw;
    max-height: 10vh;
    margin: auto;

    .start-date {
      flex: 1;
      text-align: left;
      margin: auto;
      max-width: 16vw;
      max-height: auto;
    }

    .end-date {
      flex: 1;
      text-align: center;
      margin: auto;
      max-width: 16vw;
      max-height: auto;
    }

    .update-btn {
      text-align: center;
      background-color: #94be20;
      font-weight: normal;
      margin: auto;
      max-height: 6vh;
      max-width: 16vw;
      max-height: auto;
    }
  }

  .chart-wrapper {
    flex: 1 1 auto;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #a86f19;
    padding: 1rem;
    border-radius: 4px;
    width: 93vw;
    height: 53vh;
    max-width: 88vw;

    canvas {
      width: 100% !important;
      height: 100% !important;
      border-radius: 8px;
      background-color: #42f5b0;
      max-width: 88vw
    }
  }

  .compact-text-field {
    width: 100%;

    .v-input__control {
      padding: 0;
      background-color: #f5f5f5;
      color: #42f5b0;
    }

    .v-input__slot {
      border: 1px solid #42a5f5;
      border-radius: 4px;
      color: #42f5b0;
    }

    .v-label {
      font-size: 0.9rem;
      color: #42a5f5;
    }

    .v-text-field__slot {
      font-size: 0.875rem;
      color: #333;
      color: #42f5b0;
    }

    .v-text-field__input {
      padding: 8px 12px;
      color: #42f5b0;
    }
  }
}

@media (max-width: 768px) {
  .chart-container {
    display: flex;
    flex-direction: column;
    background-color: #f9f9f9;
    background-color: red;
    background-color: pink;
    padding: 1rem;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    overflow: hidden;
    height: 83vh;
    width: 93vw;
    max-width: 93vw;
    width: 50vw;
    height: 80vh;
    padding: 0.5rem;
    background-color: #94be20;

    .date-row {
      flex-direction: column;
      align-items: flex-start;
      max-width: 90vw;

      .v-col {
        flex: none;
        margin-bottom: 1rem;
        width: 100%;
        max-width: 90vw;
      }

      .start-date {
        text-align: left;
        margin: auto;
        max-width: 20vw;
        max-height: 5vh;
      }

      .end-date {
        text-align: center;
        margin: auto;
        max-width: 20vw;
        max-height: 5vh;
      }

      .update-btn {
        top: 2vh;
        text-align: center;
        width: 100%;
        margin: auto;
        max-width: 20vw;
        max-height: 5vh;
      }

    }

    .chart-wrapper {
      padding: 0.5rem;
      width: 49vw;
      height: 5vh;
      max-width: 90vw;
    }

    .compact-text-field {
      width: 100%;
      color: #42f5b0;
    }
  }
}
</style>
