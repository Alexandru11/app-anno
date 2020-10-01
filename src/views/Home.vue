<template>
  <v-app class="home">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll>
      <v-btn @click="logout" text color="gray" >Logout</v-btn>
      <v-divider></v-divider>
      <v-avatar
        class="hidden-sm-and-down"
        color="grey darken-1 shrink"
        size="54">
        <img
          :src="profilePicture"
          :alt="profileName">
      </v-avatar>
    </v-app-bar>
    <v-main>

    <v-toolbar
      flat
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-magnify</v-icon>
      </v-btn>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>

      <template v-slot:extension>
        <v-tabs
          v-model="tabs"
          fixed-tabs
          color="green"
        >
          <v-tabs-slider></v-tabs-slider>
          <v-tab
            href="#tab-annotate"
            @click="selectedTab = 'AnnotateTab'"
          >
            Annotate
          </v-tab>

          <v-tab
            href="#tab-list-documents"
            @click="selectedTab = 'ListDocumentsTab'"
          >
            List Documents
          </v-tab>

          <v-tab
            href="#tab-statistics"
            @click="selectedTab = 'StatisticsTab'"
          >
            Statistics
          </v-tab>

          <v-tab
            href="#tab-extractors"
            @click="selectedTab = 'ExtractorsTab'"
          >
            Extractors
          </v-tab>
        </v-tabs>
      </template>
    </v-toolbar>

    <v-container fluid>
      <v-row>
          <v-col
            cols="12"
            sm="1"
          >
          </v-col>
          <v-col
                cols="12"
                sm="10"
          >
            <v-sheet
              rounded="lg"
              min-height="268"
              outlined=true
            >
                <AnnotateComponent v-if="selectedTab === 'AnnotateTab'"/>
                <ExtractorsComponent v-if="selectedTab === 'ExtractorsTab'"/>
                <ListDocumentsComponent v-if="selectedTab === 'ListDocumentsTab'"/>
                <StatisticsComponent v-if="selectedTab === 'StatisticsTab'"/>
            </v-sheet>

          </v-col>

          <v-col
            cols="12"
            sm="1"
          >
          </v-col>
      </v-row>

    </v-container>
    </v-main>
  </v-app>
</template>

<script>
// @ is an alias to /src
import AnnotateComponent from '@/components/tabs/Annotate.vue';
import ExtractorsComponent from '@/components/tabs/Extractors.vue';
import ListDocumentsComponent from '@/components/tabs/ListDocuments.vue';
import StatisticsComponent from '@/components/tabs/Statistics.vue';

export default {
  name: 'Home',
  data: () => ({
    tabs: '',
    selectedTab: 'AnnotateTab',
    profilePicture: '',
    profileName: 'Anonymous',
  }),
  components: {
    AnnotateComponent,
    ExtractorsComponent,
    ListDocumentsComponent,
    StatisticsComponent,
  },
  methods: {
    logout() {
      localStorage.removeItem('jwt');
      this.$auth.logout();
      this.$router.push('/login');
    },
  },
  created() {
    const { $auth } = this;
    $auth.getProfileInfo(localStorage.getItem('jwt'), (err, authResult) => {
      $auth.user = authResult;
      this.profilePicture = authResult.picture ? authResult.picture : '';
      this.profileName = authResult.given_name ? authResult.given_name : 'Anonymous';
    });
  },
};
</script>
