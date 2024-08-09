<template>
  <div>
    <Bar :data="chartData" :options="chartOptions" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import type { ChartData, ChartOptions } from 'chart.js';

// Register chart components
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

// Define chart data
const chartData = ref<ChartData<'bar'>>({
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sales',
      backgroundColor: '#42A5F5',
      data: [40, 39, 10, 40, 39, 80, 40]
    }
  ]
});

// Define chart options
const chartOptions = ref<ChartOptions<'bar'>>({
  responsive: true,
  plugins: {
    legend: {
      position: 'top',
    },
    tooltip: {
      callbacks: {
        label: (tooltipItem) => `${tooltipItem.dataset.label}: ${tooltipItem.raw}`
      }
    }
  }
});
</script>

<style scoped>
/* Add any styles for your chart here */
</style>
