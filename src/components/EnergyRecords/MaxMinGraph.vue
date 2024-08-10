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
      <Line :data="chartData" :options="chartOptions" />
    </div>
  </div>
</template>


<script setup lang="ts">

import { ref, onMounted } from 'vue';
import { Line } from 'vue-chartjs';
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  ChartOptions,
  ChartData,
} from 'chart.js';
import 'chartjs-adapter-date-fns'; // Ensure date adapter is included
import EnergyServices from '../../services/EnergyServices';

// Register chart components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale
);

// Initialize state variables
const endDate = ref<string>(formatDate(new Date()));
const startDate = ref<string>(calculateStartDate(endDate.value));

const chartData = ref<ChartData<'line'>>({
  labels: [],
  datasets: []
});

const chartOptions = ref<ChartOptions<'line'>>({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const datasetLabel = tooltipItem.dataset.label || '';
          if (Array.isArray(tooltipItem.raw)) {
            const [min, max] = tooltipItem.raw as [number, number];
            return `${datasetLabel}: Min ${min}, Max ${max}`;
          }
          return `${datasetLabel}: ${tooltipItem.raw}`;
        },
      },
    },
  },
  scales: {
    x: {
      type: 'time',
      time: {
        unit: 'day',
      //  tooltipFormat: 'll',
        tooltipFormat: 'PP', // Adjust format for date-fns (PP = Date in long format)
      },
      title: {
        display: true,
        text: 'Date',
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: 'Price',
      },
    },
  },
});

const EnergyData = ref<Record<string, { '4. close': string }>>({});

onMounted(async () => {
  try {
    const data = await EnergyServices.getDataFromJsons();
    if (data) {
      EnergyData.value = data['Time Series (Daily)'];
      updateChartData(); // Initialize chart data
    } else {
      console.error('No data found.');
    }
  } catch (error) {
    console.error('An error occurred while fetching the JSON data:', error);
  }
});

function updateChartData() {
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);

  if (end.getTime() <= start.getTime()) {
    alert('End date must be later than the start date.');
    return;
  }

  const filteredData = filterRecordsByDateRange(
    EnergyData.value,
    startDate.value,
    endDate.value
  );

  const minMaxData = calculateMinMaxRange(filteredData);
  const currentYearDataPoints = getCurrentYearDataPoints();

  chartData.value = {
    labels: minMaxData.map(d => d.x),
    datasets: [
      {
        label: 'Min Value',
        data: minMaxData.map(d => ({
          x: d.x,
          y: d.y[0]
        })),
        borderColor: 'brown',
        // borderColor: '#42A5F5',
        backgroundColor: 'rgba(66, 165, 245, 0.2)',
        fill: false,
        type: 'line',
      },
      {
        label: 'Max Value',
        data: minMaxData.map(d => ({
          x: d.x,
          y: d.y[1]
        })),
        borderColor: 'yellow',
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
        fill: false,
        type: 'line',
      },
      {
        label: 'Current Year',
        data: currentYearDataPoints.map(d => ({
          x: d.x,
          y: d.y
        })),
        borderColor: 'green',
        // borderColor: '#FF5722',
        backgroundColor: 'rgba(255, 87, 34, 0.2)',
        fill: false,
        type: 'line',
      },
    ],
  };
}

function filterRecordsByDateRange(data: Record<string, { '4. close': string }>, start: string, end: string) {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return Object.keys(data)
    .filter(date => {
      const dateTime = new Date(date).getTime();
      return dateTime >= startTime && dateTime <= endTime;
    })
    .reduce((result, date) => {
      result[date] = data[date];
      return result;
    }, {});
}

function calculateMinMaxRange(data: Record<string, { '4. close': string }>) {
  const minMaxMap: Record<string, [number, number]> = {};
  for (const date in data) {
    const closePrice = parseFloat(data[date]['4. close']);
    const dateObject = new Date(date);
    const monthDay = `${dateObject.getMonth() + 1}-${dateObject.getDate()}`;
    if (!minMaxMap[monthDay]) {
      minMaxMap[monthDay] = [Infinity, -Infinity];
    }
    minMaxMap[monthDay][0] = Math.min(minMaxMap[monthDay][0], closePrice); // Min
    minMaxMap[monthDay][1] = Math.max(minMaxMap[monthDay][1], closePrice); // Max
  }
  console.log(minMaxMap);
  return Object.keys(minMaxMap).map(monthDay => ({
    x: new Date(`2023-${monthDay}`).getTime(), // Use a placeholder year for the x-axis
    y: minMaxMap[monthDay]
  }));
}


function getCurrentYearDataPoints() {
  const currentYearDataPoints: { x: number, y: number }[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  for (const date in EnergyData.value) {
    const dataDate = new Date(date);
    if (dataDate.getFullYear() === currentYear) {
      currentYearDataPoints.push({
        x: dataDate.getTime(),
        y: parseFloat(EnergyData.value[date]['4. close'])
      });
    }
  }
  return currentYearDataPoints;
}

function calculateStartDate(endDate: string): string {
  const end = new Date(endDate);
  end.setFullYear(end.getFullYear() - 1); // Show data for the previous year
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

