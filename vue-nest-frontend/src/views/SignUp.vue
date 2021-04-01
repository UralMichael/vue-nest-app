<template>
  <div class="flex d-flex flex-column align-center">
    <h3 class="text-h3">Sign up</h3>
    <p v-if="showSuccess">Thank you for signing up!</p>
    <v-form
      v-else
      ref="form"
      v-model="formValid"
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

      <p v-if="showErrorMessage">{{ errorMessage }}</p>

      <p>Already have an account? <a href="/signin">Sign in.</a></p>

      <v-btn
        :disabled="!formValid"
        color="success"
        class="mr-4"
        @click="onSignUp"
      >
        Sign up
      </v-btn>
    </v-form>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from "vue-property-decorator";
import {
  Email,
  MaxLength,
  MinLength,
  Password,
  Required,
  UsernameRules,
} from "@/utils/ValidationRules";
import { SignupCredentialsDto } from "@/store/modules/auth/signup-credentials.dto";
import { AuthActionsList } from "@/store/modules/auth/actions";

@Component({})
export default class SignUp extends Vue {
  private username = "";
  private email = "";
  private password = "";
  private confirmPassword = "";
  private formValid = false;
  private showLoading = false;
  private errorMessage = "";
  private showErrorMessage = false;
  private showSuccess = false;

  private usernameRules = UsernameRules;
  private emailRules = [Required, Email];
  private passwordRules = [Required, MinLength(8), MaxLength(64), Password];

  @Ref("form") signUpForm!: {
    validate(): boolean;
  };

  get passwordConfirmationRule() {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return () =>
      this.password === this.confirmPassword || "Password must match";
  }

  async onSignUp(): void {
    if (!this.signUpForm.validate()) {
      return;
    }
    const signupCredentialsDto: SignupCredentialsDto = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.showLoading = true;
    const result = await this.$store.dispatch(
      AuthActionsList.SIGN_UP,
      signupCredentialsDto
    );
    this.showLoading = false;
    if (result === true) {
      this.showSuccess = true;
    } else {
      // this.formValid = false;
      this.showErrorMessage = true;
      this.errorMessage = result;
    }
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
