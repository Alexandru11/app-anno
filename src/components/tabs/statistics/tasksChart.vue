<script>
import { Doughnut } from 'vue-chartjs';

export default {
  extends: Doughnut,
  props: ['data'],
  mixins: [],
  mounted() {
    const chartData = this.prepareChartData().chartdata;

    this.renderChart(chartData, {
      maintainAspectRatio: false,
    });
  },
  methods: {
    prepareChartData() {
      return {
        chartdata: {
          labels: this.data.tasks.labels,
          datasets: [{
            label: 'Dataset for total annotations/tasks',
            data: this.data.tasks.dataset,
            backgroundColor: this.data.tasks.backgroundColors,
            hoverOffset: 4,
          }],
        },
      };
    },
  },
};
</script>
