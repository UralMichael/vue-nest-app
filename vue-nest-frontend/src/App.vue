<template>
  <v-app>
    <TopBar></TopBar>
    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fluid class="fill-height">
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>
    <HttpErrorSnackbar></HttpErrorSnackbar>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import TopBar from "@/components/TopBar.vue";
import HttpErrorSnackbar from "@/components/HttpErrorSnackbar.vue";

@Component({
  components: { HttpErrorSnackbar, TopBar },
})
export default class App extends Vue {}
</script>
