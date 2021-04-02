<template>
  <div ref="mainContainer" class="flex d-flex flex-column align-center">
    <h3 class="text-h3">Sign up</h3>
    <div v-if="showSuccess">
      <p>Thank you for signing up!</p>
    </div>
    <div v-if="showProgress">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-form
      v-if="!showSuccess && !showProgress"
      ref="form"
      v-model="formValid"
      lazy-validation
      class="signup-form text-center"
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

      <FormErrorMessage
        v-model="showErrorMessage"
        :message="errorMessage"
        class="signup-form-error"
      ></FormErrorMessage>

      <p>
        Already have an account? <router-link to="signin"> Sign in</router-link>
      </p>

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
import FormErrorMessage from "@/components/FormErrorMessage.vue";
import { VFormInterface } from "@/utils/types";
import {
  Email,
  MaxLength,
  MinLength,
  Password,
  Required,
  UsernameRules,
} from "@/utils/ValidationRules";
import { SignupCredentialsDto } from "@/store/modules/auth/auth-credentials.dto";
import { AuthActionsList } from "@/store/modules/auth/actions";

@Component({
  components: { FormErrorMessage },
})
export default class SignUp extends Vue {
  private username = "";
  private email = "";
  private password = "";
  private confirmPassword = "";
  private formValid = false;
  private showProgress = false;
  private errorMessage = "";
  private showErrorMessage = false;
  private showSuccess = false;

  private usernameRules = UsernameRules;
  private emailRules = [Required, Email];
  private passwordRules = [Required, MinLength(8), MaxLength(64), Password];

  @Ref("form") signUpForm!: VFormInterface;
  @Ref("mainContainer") mainContainer!: HTMLDivElement;

  get passwordConfirmationRule() {
    // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
    return () =>
      this.password === this.confirmPassword || "Password must match";
  }

  private showProgressContainer() {
    const size = this.mainContainer.getBoundingClientRect();
    this.mainContainer.style.height = size.height + "px";
    this.showProgress = true;
  }

  private hideProgressContainer() {
    this.mainContainer.style.height = "";
    this.showProgress = false;
  }

  async onSignUp(): Promise<void> {
    this.showErrorMessage = false;
    if (!this.signUpForm.validate()) {
      return;
    }
    const signupCredentialsDto: SignupCredentialsDto = {
      username: this.username,
      email: this.email,
      password: this.password,
    };
    this.showProgressContainer();
    const result = await this.$store.dispatch(
      AuthActionsList.SIGN_UP,
      signupCredentialsDto
    );
    this.hideProgressContainer();
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
.signup-form {
  width: 20vw;
  min-width: 256px;
}

.signup-form-error {
  margin: 0.5em 0;
}

h3 {
  margin-bottom: 0.5em;
}

p {
  line-height: 3em;
}
</style>
