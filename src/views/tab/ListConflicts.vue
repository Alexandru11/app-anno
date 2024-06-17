<template>
  <v-card>
    <v-card-title color="green lighten-4" class="green lighten-3 black--text text-h5">
      Conflict Directory
    </v-card-title>
    <v-row
      class="pa-4"
      justify="space-between"
    >
      <v-col cols="5">
        <v-treeview
          :active.sync="active"
          :items="items"
          :load-children="fetchConflicts"
          :open.sync="open"
          item-key="_id"
          item-text="taskId"
          activatable
          color="warning"
          open-on-click
          transition
        >
          <template v-slot:prepend="{ item }">
            <v-icon v-if="!item.children">
              mdi-account
            </v-icon>
          </template>
        </v-treeview>
      </v-col>

      <v-divider vertical></v-divider>

      <v-col
        class="d-flex text-center"
      >
        <v-scroll-y-transition mode="out-in">
          <div
            v-if="!selected"
            class="text-h6 grey--text text--lighten-1 font-weight-light"
            style="align-self: center;"
          >
            Select a Conflict to solve
          </div>
          <v-card
            v-else
            :key="selected._id"
            class="pt-6 mx-auto"
            flat
            max-width="400"
          >
            <v-card-text>
              <v-avatar
                v-if="avatar"
                size="88"
              >
                <v-img
                  :src="`https://avataaars.io/${avatar}`"
                  class="mb-6"
                ></v-img>
              </v-avatar>
              <h3 class="text-h5 mb-2">
                {{ selected.conflictedUser.name }}
              </h3>
              <h3 class="text-h6 mb-2">
                {{ selected.conflictedUser.email }}
              </h3>
              <div class="blue--text mb-2">
                {{ selected.taskText }}
              </div>
            </v-card-text>
            <v-divider></v-divider>
            <v-row
              class="text-left"
              tag="v-card-text"
            >
              <h2>
                Entities:
              </h2>
              <v-list-item v-for="property in selected.conflictedProperties"
                          :key="property._id">
                <v-list-item-content>
                  <v-list-item-title>
                    {{property.conflictedEntity}} at position
                     ({{property.conflictedStartPos}}, {{property.conflictedEndPos}})
                  </v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-row>
            <v-row>
                <v-btn
                  block
                  @click="solve()">
                  Solve
                </v-btn>
            </v-row>
          </v-card>
        </v-scroll-y-transition>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import conflictApi from '@/api/ConflictApi';
import enums from '@/utils/enums';

const avatars = [
  '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
  '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
  '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
  '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
  '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly',
];

export default {
  name: 'ListConflictsComponent',
  data: () => ({
    active: [],
    avatar: null,
    open: [],
    conflicts: [],
  }),

  computed: {
    items() {
      return [
        {
          name: 'Conflicts',
          children: this.conflicts,
        },
      ];
    },
    selected() {
      if (!this.active.length) return undefined;

      const id = this.active[0];

      // eslint-disable-next-line no-underscore-dangle
      return this.conflicts.find((conflict) => conflict._id === id);
    },
  },

  watch: {
    selected: 'randomAvatar',
  },

  methods: {
    async fetchConflicts(item) {
      await conflictApi.conflicts(this.$auth.user.sub, (res) => {
        item.children.push(...res.values);
      });
    },
    randomAvatar() {
      this.avatar = avatars[Math.floor(Math.random() * avatars.length)];
    },
    solve() {
      // eslint-disable-next-line no-underscore-dangle
      const conflict = this.conflicts.find((c) => c._id === this.active[0]);
      this.setSelectedTask(conflict);
      this.setAnnotationState(conflict);
      // Go to annotation menu
      this.$router.push('/annotate');
    },
    setAnnotationState(conflict) {
      const store = this.$store;
      store.commit('setAnnotationState', enums.annotationState.UPDATE);
      store.commit('setAnnotationId', conflict.annotationId);
    },
    setSelectedTask(conflict) {
      const store = this.$store;
      store.commit('setTaskText', conflict.taskText);
      store.commit('setTaskId', conflict.taskId);
    },
  },
};
</script>
