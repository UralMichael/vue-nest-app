<template>
  <div ref="mainContainer" class="flex d-flex flex-column align-center">
    <h3 class="text-h3">Sign in</h3>
    <div v-if="showProgress">
      <v-progress-circular indeterminate></v-progress-circular>
    </div>
    <v-form
      v-else
      ref="form"
      v-model="formValid"
      lazy-validation
      class="signin-form text-center"
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

      <FormErrorMessage
        v-model="showErrorMessage"
        :message="errorMessage"
        class="signup-form-error"
      ></FormErrorMessage>

      <p>
        Don't have an account? <router-link to="signup"> Sign up.</router-link>
      </p>

      <v-btn
        :disabled="!formValid"
        color="success"
        class="mr-4"
        @click="onSignIn"
      >
        Sign in
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
  UsernameRules,
  MinLength,
  Required,
  MaxLength,
} from "@/utils/ValidationRules";
import { InputValidationRule } from "vuetify";
import { SigninCredentialsDto } from "@/store/modules/auth/auth-credentials.dto";
import { AuthActionsList } from "@/store/modules/auth/actions";

@Component({
  components: { FormErrorMessage },
})
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

  private usernameOrEmail = "";
  private password = "";
  private formValid = false;
  private showProgress = false;
  private errorMessage = "";
  private showErrorMessage = false;

  private usernameEmailRules = [Required, SignIn.EmailUsernameRule];
  private passwordRules = [Required, MinLength(8), MaxLength(64)];

  @Ref("form") signInForm!: VFormInterface;
  @Ref("mainContainer") mainContainer!: HTMLDivElement;

  private showProgressContainer() {
    const size = this.mainContainer.getBoundingClientRect();
    this.mainContainer.style.height = size.height + "px";
    this.showProgress = true;
  }

  private hideProgressContainer() {
    this.mainContainer.style.height = "";
    this.showProgress = false;
  }

  async onSignIn(): Promise<void> {
    this.showErrorMessage = false;
    if (!this.signInForm.validate()) {
      return;
    }
    const isEmail = this.usernameOrEmail.includes("@");
    const authCredentialsDto: SigninCredentialsDto = {
      username: isEmail ? null : this.usernameOrEmail,
      email: isEmail ? this.usernameOrEmail : null,
      password: this.password,
    };
    this.showProgressContainer();
    await new Promise((resolve) => setTimeout(resolve, 500));
    const result = await this.$store.dispatch(
      AuthActionsList.SIGN_IN,
      authCredentialsDto
    );
    this.hideProgressContainer();
    if (result === true) {
      this.$router.push("/");
    } else {
      this.showErrorMessage = true;
      this.errorMessage = result;
    }
  }
}
</script>

<style scoped>
.signin-form {
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
