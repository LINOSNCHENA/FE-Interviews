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
import { ref, onMounted } from "vue";
import { Line } from "vue-chartjs";
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
  Filler,
} from "chart.js";
import "chartjs-adapter-date-fns";
import EnergyServices from "../../services/EnergyServices";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  TimeScale,
  Filler
);

// Initialize state variables
const endDate = ref<string>(formatDate(new Date()));
const startDate = ref<string>(calculateStartDate(endDate.value));

const chartData = ref<ChartData<"line">>({
  labels: [],
  datasets: [],
});

const chartOptions = ref<ChartOptions<"line">>({
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => {
          const datasetLabel = tooltipItem.dataset.label || "";
          if (Array.isArray(tooltipItem.raw)) {
            const value = tooltipItem.raw[1];
            return `${datasetLabel}: ${value}`;
          } else if (
            typeof tooltipItem.raw === "object" &&
            tooltipItem.raw !== null
          ) {
            const values = Object.values(
              tooltipItem.raw as { [key: string]: any }
            );
            const value = values.length > 1 ? values[1] : values[0];
            return `${datasetLabel}:  Price : CZK ${value.toFixed(2)}`;
          } else {
            const value = tooltipItem.raw as number | string;
            return `${datasetLabel}: ${value}`;
          }
        },
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        tooltipFormat: "PP",
      },
      title: {
        display: true,
        text: "Date",
      },
    },
    y: {
      beginAtZero: true,
      title: {
        display: true,
        text: "Price",
      },
    },
  },
});

const EnergyData = ref<Record<string, { "4. close": string }>>({});

onMounted(async () => {
  try {
    const data = await EnergyServices.getDataFromJsons();
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
  const start = new Date(startDate.value);
  const end = new Date(endDate.value);
  if (end.getTime() <= start.getTime()) {
    alert("End date must be later than the start date.");
    return;
  }

  const filteredData = filterRecordsByDateRange(
    EnergyData.value,
    startDate.value,
    endDate.value
  );
  const minMaxData1 = calculateMinMaxRange(filteredData);
  const currentYearDataPoints = getCurrentYearDataPoints();
  console.log(minMaxData1[0]);

  const minMaxData = minMaxData1.sort((a, b) => a.dated - b.dated);
  let x = minMaxData;
  let gap = x.map(x => x.gap);
  let max = x.map(x => x.max);
  let min = x.map(x => x.min);

  chartData.value = {
    labels: minMaxData.map((d) => new Date(d.dated)),
    datasets: [
      {
        label: "1. Max Values (" + max.length + ")",
        data: minMaxData.map((d) => ({ x: d.dated, y: d.max })),
        borderColor: 'blue', // Blue border for visibility
        borderWidth: 1, // Thin border
        backgroundColor: 'rgba(0, 0, 255, 0.3)', // Semi-transparent blue fill
        fill: true,
        type: "line",
      },
      // {
      //   label: '2. Maxz (' + maxz.length + ')',
      //   data: minMaxData.map((d) => ({ x: d.dated, y: d.maxz })),
      //   borderColor: 'yellow', // Yellow border for visibility
      //   backgroundColor: 'rgba(255, 255, 0, 0.3)', // Semi-transparent yellow fill
      //   fill: true,
      //   type: 'line',
      // },
      {
        label: '3. Gap (' + gap.length + ')',
        data: minMaxData.map((d) => ({ x: d.dated, y: d.gap })),
        borderColor: 'red', // Red border for visibility
        backgroundColor: 'rgba(255, 0, 0, 0.3)', // Semi-transparent red fill
        fill: true,
        type: 'line',
      },
      {
        label: '4. Min Values (' + min.length + ')',
        data: minMaxData.map((d) => ({ x: d.dated, y: d.min })),
        borderColor: 'green', // Green border for visibility
        backgroundColor: 'rgba(0, 128, 0, 0.3)', // Semi-transparent green fill
        fill: true,
        type: 'line',
      },
      // {
      //   label: "5. Minz (" + minz.length + ")",
      //   data: minMaxData.map((d) => ({ x: d.dated, y: d.minz })),
      //   borderColor: 'teal', // Orange border for visibility
      //   borderWidth: 1, // Thin border
      //   backgroundColor: 'rgba(255, 165, 0, 0.3)', // Semi-transparent orange fill
      //   fill: true,
      //   type: "line",
      // },
      {
        label: "6. Current Year (" + currentYearDataPoints.length + ")",
        data: currentYearDataPoints.map((d) => ({ x: d.x, y: d.y })),
        borderColor: "brown", // Brown border for visibility
        borderWidth: 1, // Thin border
        backgroundColor: "rgba(165, 42, 42, 0.3)", // Semi-transparent brown fill
        fill: true,
        type: "line",
      },
    ],
  };
}

function filterRecordsByDateRange(
  data: Record<string, { "4. close": string }>,
  start: string,
  end: string
) {
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

function calculateMinMaxRange(data: Record<string, { "4. close": string }>) {
  const minMaxMap: Record<string, any> = {};

  for (const date in data) {
    const closePrice = parseFloat(data[date]["4. close"]);
    if (isNaN(closePrice)) continue;

    const dateObject = new Date(date);
    const monthDay = `${dateObject.getMonth() + 1}-${dateObject.getDate()}`;

    const filteredData = Object.entries(data)
      .filter(([dataDate]) => {
        const dataDateObject = new Date(dataDate);
        const monthDay2 = `${dataDateObject.getMonth() + 1
          }-${dataDateObject.getDate()}`;
        return monthDay === monthDay2;
      })
      .map(([dataDate, value]) => ({
        date: dataDate.slice(5),
        close: parseFloat(value["4. close"]),
      }));

    const maxClose = filteredData.reduce(
      (max, item) => Math.max(max, item.close),
      -Infinity
    );
    const minClose = filteredData.reduce(
      (min, item) => Math.min(min, item.close),
      Infinity
    );
    const maxMinBalance = [maxClose, minClose, maxClose - minClose];

    if (!minMaxMap[monthDay]) {
      minMaxMap[monthDay] = [
        closePrice,
        closePrice,
        [closePrice],
        maxMinBalance,
      ];
    } else {
      minMaxMap[monthDay][0] = Math.min(minMaxMap[monthDay][0], closePrice);
      minMaxMap[monthDay][1] = Math.max(minMaxMap[monthDay][1], closePrice);
      minMaxMap[monthDay][2] = maxMinBalance;
      minMaxMap[monthDay][3].push(closePrice);
    }
  }
  const placeholderYear = 2023;
  return Object.keys(minMaxMap).map((monthDay) => {
    const [month, day] = monthDay.split("-").map(Number);
    const formattedDate = `${placeholderYear}-${month
      .toString()
      .padStart(2, "0")}-${day.toString().padStart(2, "0")}`;
    return {
      dated: new Date(formattedDate).getTime(),
      minz: minMaxMap[monthDay][0],
      maxz: minMaxMap[monthDay][1],
      max: minMaxMap[monthDay][2][0],
      min: minMaxMap[monthDay][2][1],
      gap: minMaxMap[monthDay][2][2],
      all: minMaxMap[monthDay][3],
    };
  });
}

function getCurrentYearDataPoints() {
  const currentYearDataPoints: { x: number; y: number }[] = [];
  const now = new Date();
  const currentYear = now.getFullYear();

  for (const date in EnergyData.value) {
    const dataDate = new Date(date);
    if (dataDate.getFullYear() === currentYear) {
      currentYearDataPoints.push({
        x: dataDate.getTime(),
        y: parseFloat(EnergyData.value[date]["4. close"]),
      });
    }
  }
  return currentYearDataPoints;
}

function calculateStartDate(endDate: string): string {
  const end = new Date(endDate);
  end.setFullYear(end.getFullYear() - 4);
  return formatDate(end);
}

function formatDate(date: Date): string {
  return date.toISOString().split("T")[0];
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
    border: 1px solid #42a5f5;
    border-radius: 4px;
  }

  .v-label {
    font-size: 0.9rem;
    color: #42a5f5;
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
