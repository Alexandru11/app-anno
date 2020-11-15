<template>
  <v-data-table
    :headers="taskHeaders"
    :items="tasks"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :single-select="true"
    item-key="taskId"
    show-expand
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar flat>
        <v-toolbar-title>Tasks available</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-switch
          v-model="singleExpand"
          label="Single expand"
          class="mt-2"
        ></v-switch>
      </v-toolbar>
    </template>
    <template v-slot:expanded-item="{ headers, item }">
      <td :colspan="headers.length">
        More info about {{ item.description }}
      </td>
    </template>
  </v-data-table>
</template>

<script>
import tasksModel from '@/models/TasksModel';

import taskApi from '@/api/TaskApi';

export default {
  name: 'TasksComponent',
  data: tasksModel,
  methods: {
  },
  created() {
    taskApi.taskList((result) => {
      this.tasks = result.values;
    });
  },
};
</script>
