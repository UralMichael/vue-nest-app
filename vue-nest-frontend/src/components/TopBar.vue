<template>
  <v-app-bar app>
    <v-app-bar-nav-icon></v-app-bar-nav-icon>
    <v-toolbar-title>Title</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn v-if="!isAuthorized" href="signin" class="top-bar-btn"
      >Sign in</v-btn
    >
    <v-btn v-if="!isAuthorized" href="signup" class="top-bar-btn"
      >Sign up</v-btn
    >
    <v-btn v-if="isAuthorized" @click="onSignOut" class="top-bar-btn"
      >Sign out</v-btn
    >
  </v-app-bar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { AuthGettersList } from "@/store/modules/auth/getters";
import { AuthActionsList } from "@/store/modules/auth/actions";

@Component({})
export default class TopBar extends Vue {
  get isAuthorized(): boolean {
    console.log(this.$store.getters, AuthGettersList.IS_LOGGED_IN);
    return this.$store.getters[AuthGettersList.IS_LOGGED_IN];
  }

  onSignOut(): void {
    this.$store.dispatch(AuthActionsList.SIGN_OUT);
  }
}
</script>

<style scoped>
.top-bar-btn {
  margin: 0 8px;
}
</style>
