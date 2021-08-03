<template>
<v-row>
  <v-col>
    <div class="text-h2 align-center">Total annotations</div>
    <TasksChart class="mt-8" :width="500" :height="500" v-if="loaded" v-bind:data=chartdata>
    </TasksChart>
  </v-col>
  <v-divider vertical></v-divider>
  <v-col>
    <div class="text-h1 align-center">{{chartdata.tasks.total}}</div>
    <div class="text-h2 align-center">tasks in total</div>
  </v-col>

</v-row>
</template>

<script>
import tasksChart from '@/components/tabs/statistics/tasksChart.vue';
import statisticsApi from '@/api/StatisticsApi';

export default {
  components: {
    TasksChart: tasksChart,
  },
  name: 'StatisticsComponent',
  data: () => ({
    chartdata: {
      tasks: {
        labels: [],
        dataset: [],
        backgroundColors: [],
        total: 0,
      },
    },
    loaded: false,
  }),
  methods: {
  },
  created() {
    // call API for data
    const that = this;
    const userId = this.$auth.user.sub;
    statisticsApi.getStatistics(userId, ({ values }) => {
      that.chartdata = values;
      that.loaded = true;
    });
  },
};
</script>
