<template>
  <v-snackbar :value="snackbar">
    {{ text }}
    <template>
      <v-btn color="pink" text @click="onClose"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { HttpErrorMutationsList } from "@/store/modules/httpError/mutations";
import { HttpErrorGettersList } from "@/store/modules/httpError/getters";

@Component({})
export default class HttpErrorSnackbar extends Vue {
  get snackbar(): boolean {
    return this.$store.state.httpError.snackbar;
  }

  get text(): string {
    return this.$store.getters[HttpErrorGettersList.GET_ERROR_TEXT];
  }

  onClose(): void {
    this.$store.commit(HttpErrorMutationsList.SET_SNACKBAR, false);
  }
}
</script>

<style scoped></style>
