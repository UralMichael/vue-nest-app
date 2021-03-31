<template>
  <div class="flex d-flex flex-column align-center">
    <h3 class="text-h3">Sign in</h3>
    <v-form
      ref="form"
      v-model="valid"
      lazy-validation
      class="auth-form text-center"
    >
      <v-text-field
        v-model="usernameOrEmail"
        label="Username or Email"
        :rules="usernameEmailRules"
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

      <p>Dont have an account? <a href="/signup">Sign up.</a></p>

      <v-btn :disabled="!valid" color="success" class="mr-4" @click="onSignIn">
        Sign in
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import {
  Email,
  UsernameRules,
  MinLength,
  Required,
  MaxLength,
} from "@/utils/ValidationRules";
import { InputValidationRule } from "vuetify";

@Component({})
export default class SignIn extends Vue {
  static EmailUsernameRule: InputValidationRule = (value: string) => {
    /* check if value is like email */
    if (value.includes("@")) {
      return Email(value);
    }
    /* else validate as username */
    for (let rule of UsernameRules) {
      const result = rule(value);
      if (result !== true) return result;
    }
    return true;
  };

  usernameOrEmail = "";
  password = "";
  valid = false;
  usernameEmailRules = [Required, SignIn.EmailUsernameRule];
  passwordRules = [Required, MinLength(8), MaxLength(64)];

  onSignIn(): void {
    if (!this.$refs.form.validate()) {
      return;
    }
    const isEmail = this.usernameOrEmail.includes("@");
    const dto = {
      username: isEmail ? "" : this.usernameOrEmail,
      email: isEmail ? this.usernameOrEmail : "",
      password: this.password,
    };
    console.log(dto);
    // this.$store.dispatch('auth/signIn', dto);
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
