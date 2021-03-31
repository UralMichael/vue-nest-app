<template>
  <v-app-bar app>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn href="signin" class="top-bar-btn">sign in</v-btn>
    <v-btn href="signup" class="top-bar-btn">sign up</v-btn>
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

@Component({})
export default class TopBar extends Vue {}
</script>

<style scoped>
.top-bar-btn {
  margin: 0 8px;
}
</style>
