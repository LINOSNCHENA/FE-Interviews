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
        <v-btn @click="updateChartData" class="update-btn" width="20vw" height="50px">Update Monthly data</v-btn>
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
import { useRouter } from "vue-router";
import AuthServices from "../../services/AuthServices";


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

const chartData = ref<ChartData<"bar">>({
  labels: [],
  datasets: [
    {
      label: "Monthly Average Prices",
      backgroundColor: "yellow",
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
const EnergyData = ref<any>(null);
const dataFiltered=ref(0);
const dataRecorded=ref(0);
onMounted(async () => {
  try {
    const data = await EnergyServices.getDataFromJsons();
    const user = await AuthServices.getUser();
    if (user === "None@gmail.com") {
      router.push({ name: "Login" });
    }
    if (data) {    
      EnergyData.value = data["Time Series (Daily)"];
      updateChartData(); 
    } else {
      console.error("No data found.");
    }
  } catch (error) {
    console.error("An error occurred while fetching the JSON data:", error);
  }
});

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
  const monthlyAverages = calculateMonthlyAverages(filteredData); 
  dataRecorded.value=Object.values(monthlyAverages).length;
  dataFiltered.value=Object.values(filteredData).length;  
  chartData.value = {
    labels: Object.keys(monthlyAverages),
    datasets: [
      {
        label: "Closing Prices : Monthly Average Prices | Months counted : ("+String(dataRecorded.value)+"/"+String(dataFiltered.value)+")",
        backgroundColor: "monarch",
        data: Object.values(monthlyAverages),
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

function calculateMonthlyAverages(data) {
  const monthlyTotals = {};
  const monthlyCounts = {};
  Object.keys(data).forEach(date => {
    const value = parseFloat(data[date]["4. close"]);
    const month = date.slice(0, 7); // YYYY-MM
    if (!monthlyTotals[month]) {
      monthlyTotals[month] = 0;
      monthlyCounts[month] = 0;
    }
    monthlyTotals[month] += value;
    monthlyCounts[month] += 1;
  });
  const monthlyAverages = Object.keys(monthlyTotals).reduce((averages, month) => {
    averages[month] = monthlyTotals[month] / monthlyCounts[month];
    return averages;
  }, {});
  return monthlyAverages;
}

function calculateStartDate(endDate: string): string {
  const end = new Date(endDate);
  end.setMonth(end.getMonth() - 90); 
  return formatDate(end);
}

function formatDate(date: Date): string {
  return date.toISOString().split('T')[0];
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
  font-size: smaller;
  text-transform: lowercase;
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
  background-color: #e2e2e7;
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
