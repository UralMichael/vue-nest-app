<template>
  <div class="flex d-flex flex-column align-center">
    <h3 class="text-h3">Sign up</h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="auth-form text-center"
    >
      <v-text-field
        v-model="username"
        label="Name"
        counter
        minLength="4"
        maxlength="64"
        :rules="usernameRules"
      ></v-text-field>

      <v-text-field
        v-model="email"
        label="E-mail"
        :rules="emailRules"
      ></v-text-field>

      <v-text-field
        v-model="password"
        label="Password"
        type="password"
        counter
        minLength="8"
        maxlength="64"
        :rules="passwordRules"
      ></v-text-field>

      <v-text-field
        v-model="confirmPassword"
        label="Confirm password"
        type="password"
        counter
        minLength="8"
        maxlength="64"
        :rules="[passwordConfirmationRule]"
      ></v-text-field>

      <p>Already have an account? <a href="/signin">Sign in.</a></p>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="onSignUp">
        Sign up
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Email,
  MaxLength,
  MinLength,
  Password,
  Required,
  UsernameRules,
} from "@/utils/ValidationRules";

@Component({})
export default class SignUp extends Vue {
  username = "";
  email = "";
  password = "";
  confirmPassword = "";
  valid = false;
  usernameRules = UsernameRules;
  emailRules = [Required, Email];
  passwordRules = [Required, MinLength(8), MaxLength(64), Password];

  get passwordConfirmationRule() {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return () =>
      this.password === this.confirmPassword || "Password must match";
  }

  onSignUp(): void {
    if (!this.$refs.form.validate()) {
      return;
    }
    const dto = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    console.log(dto);
    // this.$store.dispatch('auth/signUp', dto);
  }
}
</script>

<style scoped>
.auth-form {
  width: 20vw;
  min-width: 256px;
}

h3 {
  margin-bottom: 0.5em;
}

p {
  margin: 1em 0;
}
</style>
