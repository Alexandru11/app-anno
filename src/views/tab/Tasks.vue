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
        <v-toolbar-title>Available tasks</v-toolbar-title>
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
        {{ item.description }}
      </td>
    </template>
  </v-data-table>
  </div>
</template>

<script>
import tasksModel from '@/models/TasksModel';
import taskApi from '@/api/TaskApi';
import enums from '@/utils/enums';

export default {
  name: 'TasksComponent',
  data: tasksModel,
  methods: {
    onRowSelected(oEvent) {
      const { _id } = oEvent.item;
      if (oEvent.value === false && this.selected.includes(_id)) {
        this.selected.splice(this.selected.indexOf(_id), 1);
      } else {
        this.selected.push(_id);
      }
      console.log(this.selected);
    },
    startAnnotation() {
      // lockUserOnTask(this.userName, this.selected);
      if (!this.selected.length) {
        this.throwError('Please choose a task first!');
      } else {
        this.setNewTask();
        this.setAnnotationState();
        this.$router.push('/annotate');
      }
      // go-to Annotation tab
    },
    setNewTask() {
      const store = this.$store;
      // eslint-disable-next-line no-underscore-dangle
      store.commit('setTaskText', this.tasks.find((task) => task._id === this.selected[0]).description);
      store.commit('setTaskId', this.selected[0]);
    },
    setAnnotationState() {
      const store = this.$store;
      store.commit('setAnnotationState', enums.annotationState.NEW);
      store.commit('setAnnotationId', undefined);
    },
    throwError(message) {
      const store = this.$store;
      store.commit('setError', message);
      store.dispatch('resetError');
    },
  },
  created() {
    const userId = this.$auth.user.sub;
    taskApi.taskList((result) => {
      this.tasks = result.values;
    }, userId);
  },

};
</script>
