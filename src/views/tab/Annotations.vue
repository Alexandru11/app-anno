<template>
  <div>
  <v-toolbar
    dense
    color="green lighten-3"
  >
    <v-toolbar-title>Your Annotations</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn icon
          v-on:click="getAnnotations">
      <v-icon>mdi-download</v-icon>
    </v-btn>
  </v-toolbar>
  <v-simple-table fixed-header>
    <template v-slot:default>
      <thead>
        <tr>
          <th class="text-left">
            Task Name
          </th>
          <th class="text-left">
            Annotations
          </th>
        </tr>
      </thead>
      <tbody>
        <tr
          v-for="item in annotations"
          :key="item._id"
        >
          <td>{{ item.taskText }}</td>

          <td>
            <v-chip
              v-for="prop in item.annotationProperties"
              :key="prop._id"
              class="ma-2">
              {{ prop.entity }}
            </v-chip>
          </td>
        </tr>
      </tbody>
    </template>
  </v-simple-table>
  </div>
</template>

<script>
import annotateApi from '@/api/AnnotateApi';

export default {
  name: 'AnnotationsComponent',
  data: () => ({
    annotations: [],
  }),
  methods: {
    getAnnotations() {
      const userId = this.$auth.user.sub;
      annotateApi.getAnnotationsFile(() => {
        console.log('File downloaded properly!');
      }, userId);
    },
  },
  created() {
    const userId = this.$auth.user.sub;
    annotateApi.annotationsList((result) => {
      this.annotations = result.values;
    }, userId);
  },
};
</script>
