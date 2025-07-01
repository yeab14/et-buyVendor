<template>
    <div class="h-64">
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Pie } from 'vue-chartjs';
  
  export default {
    name: 'PieChart',
    extends: Pie,
    props: {
      chartData: { type: Object, required: true }
    },
    mounted() {
      this.renderChart(this.chartData, {
        responsive: true,
        maintainAspectRatio: false
      });
    }
  };
  </script>
  