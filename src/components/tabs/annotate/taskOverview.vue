<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div v-if="taskDescription">Task Description</div>
      <p class="text--primary">
        {{ taskDescription }}
      </p>

      <div v-if="params.labels">
        <div>Labels for entity annotation</div>
        <div
          v-for="(label) in params.labels"
          v-bind:key="label.name"
          class="text--primary"
          style="display: inline-block; margin-left: 1em"
        >
          {{ label.display_name }}
        </div>
      </div>

    </v-card-text>
    <v-card-actions>
    </v-card-actions>
  </v-card>
</template>

<script>

export default {
  name: 'TaskOverview',
  props: ['taskDescription', 'params'],
  data: () => ({
  }),
  methods: {},
};
</script>
