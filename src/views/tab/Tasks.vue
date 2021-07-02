<template>
  <div>
  <v-btn
    v-on:click="startAnnotation"
  >Annotate</v-btn>
  <v-data-table
    :headers="taskHeaders"
    :items="tasks"
    :single-expand="singleExpand"
    :expanded.sync="expanded"
    :single-select="true"
    item-key="_id"
    show-expand
    show-select
    class="elevation-1"
    @item-selected="onRowSelected"
    style="margin-top: 2em"
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
  </div>
</template>

<script>
import tasksModel from '@/models/TasksModel';
import taskApi from '@/api/TaskApi';

export default {
  name: 'TasksComponent',
  data: tasksModel,
  methods: {
    onRowSelected(oEvent) {
      const { id } = oEvent.item;
      if (oEvent.value === false && this.selected.includes(id)) {
        this.selected.splice(this.selected.indexOf(id), 1);
      } else {
        this.selected.push(id);
      }

      console.log(this.selected);
    },
    startAnnotation() {
      // lockUserOnTask(this.userName, this.selected);
      if (!this.selected.length) {
        this.$store.commit('setError', 'Please choose a task first!');
        this.$store.dispatch('resetError');
      } else {
        this.$store.commit('setTaskText', this.tasks.find((task) => task.id === this.selected[0]).description);
        this.$store.commit('setTaskId', this.selected[0]);
        this.$router.push('/annotate');
      }
      // go-to Annotation tab
    },
  },
  created() {
    taskApi.taskList((result) => {
      this.tasks = result.values;
    });
  },

};
</script>
