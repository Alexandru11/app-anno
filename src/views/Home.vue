<template>
  <v-app class="home">
    <v-app-bar
      absolute
      color="white"
      elevate-on-scroll>
      <v-btn @click="logout" text color="gray" >Logout</v-btn>
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
      <AnnotateComponent v-if="selectedTab === 'AnnotateTab'"/>
      <ExtractorsComponent v-if="selectedTab === 'ExtractorsTab'"/>
      <ListDocumentsComponent v-if="selectedTab === 'ListDocumentsTab'"/>
      <StatisticsComponent v-if="selectedTab === 'StatisticsTab'"/>
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
    selectedTab: 'AnnotateTab',
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
};
</script>
