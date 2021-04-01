<template>
  <div v-if="visible" class="form-error-message">
    {{ message }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, VModel, Vue } from "vue-property-decorator";

@Component({})
export default class FormErrorMessage extends Vue {
  @Prop({ type: String }) message!: string;
  @VModel({ type: Boolean }) visible!: boolean;
}
</script>

<style lang="scss" scoped>
@import "~vuetify/src/styles/main.sass";

.form-error-message {
  border-radius: 4px;
  background-color: map-get($red, "darken-1");
  color: white;
  line-height: 2em;
}
</style>
