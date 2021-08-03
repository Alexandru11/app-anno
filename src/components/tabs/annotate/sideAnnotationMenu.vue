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
            :value="item.entity"
            active-class="deep-purple--text text--accent-4"
          >
            <template >
              <v-list-item-content>
                <v-list-item-title v-text="item.entity"></v-list-item-title>
              </v-list-item-content>

              <v-list-item-action>
                <v-row>
                  <v-icon small
                          right
                          text
                          color="orange darken-4"
                          @click="edit(item)">
                    mdi-pencil
                  </v-icon>
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
  name: 'SideAnnotationMenu',
  props: ['annotations'],
  data: () => ({
  }),
  methods: {
    edit(item) {
      this.emitEditToParent(item);
    },
    emitEditToParent(item) {
      this.$emit('edit-annotation', item);
    },
  },
  watch: {
  },
};
</script>
