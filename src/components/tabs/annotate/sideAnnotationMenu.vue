<template>
<v-sheet
        rounded="lg"
        min-height="600"
        outlined
>
 <v-virtual-scroll
      :items="annotations"
      :item-height="50"
      height="600"
>
        <template v-slot:default="{ item }">

          <v-list-item
            :value="item"
            active-class="deep-purple--text text--accent-4"
          >
            <template v-slot:default="{ active }">
              <v-list-item-content>
                <v-list-item-title v-text="item"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-row>
                <v-btn
                  small
                  left
                  text
                  depressed
                >
                  <v-icon
                    color="orange darken-4"
                    left
                  >
                    mdi-pencil
                  </v-icon>
                </v-btn>
                <v-checkbox
                  :input-value="active"
                  color="deep-purple accent-4"
                ></v-checkbox>
                </v-row>
              </v-list-item-action>
            </template>
          </v-list-item>
        </template>
 </v-virtual-scroll>
</v-sheet>
</template>

<script>
export default {
  props: ['annotations'],
  data: () => ({
  }),
  methods: {
  },
  watch: {
  },
};
</script>
