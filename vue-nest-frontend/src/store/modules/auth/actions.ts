import { ActionTree } from "vuex";
import { AuthState } from "@/store/modules/auth/auth-state.model";
import { RootState } from "@/store/root-state.model";
import { HttpClient } from "@/http-common";
// import { AuthCredentialsDto } from "@/store/modules/auth/auth-credentials.dto";
import { SignupCredentialsDto } from "@/store/modules/auth/signup-credentials.dto";
import { HttpErrorMutationsList } from "@/store/modules/httpError/mutations";
import { AxiosResponse, AxiosError } from "axios";

export enum AuthActionsList {
  SIGN_IN = 'auth/signIn',
  SIGN_UP = 'auth/signUp',
}

export const actions: ActionTree<AuthState, RootState> = {
  // async signIn({ commit, dispatch, getters }, payload: AuthCredentialsDto): Promise<void> {
  //   console.log(payload);
  //   try {
  //     const response: AxiosResponse = await HttpClient.post("auth/signin", payload);
  //   } catch (e) {
  //     console.error(e.m)
  //   }
  // },

  async signUp({ commit, dispatch, getters }, signupCredentialsDto: SignupCredentialsDto): Promise<boolean | string> {
    console.log(signupCredentialsDto);
    try {
      const response: AxiosResponse = await HttpClient.post("auth/signup", signupCredentialsDto);
      console.log(response);
      return response.status === 201;
    } catch (e) {
      commit(HttpErrorMutationsList.SET_HTTP_ERROR, e, { root: true });
      return (e as AxiosError).response?.data?.message || "Sorry, error happened.";
    }
  },
};
