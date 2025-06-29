<template>
    <div class="h-64">
      <canvas ref="canvas"></canvas>
    </div>
  </template>
  
  <script>
  import { Line } from 'vue-chartjs';
  
  export default {
    name: 'LineChart',
    extends: Line,
    props: {
      chartData: { type: Object, required: true },
      options: { type: Object, default: () => ({}) }
    },
    mounted() {
      this.renderChart(this.chartData, this.options);
    }
  };
  </script>
  