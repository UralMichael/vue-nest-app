import { ActionTree } from "vuex";
import { AuthState } from "@/store/modules/auth/auth-state.model";
import { RootState } from "@/store/root-state.model";
import { HttpClient } from "@/http-common";
import { SigninCredentialsDto, SignupCredentialsDto } from "@/store/modules/auth/auth-credentials.dto";
import { HttpErrorMutationsList } from "@/store/modules/httpError/mutations";
import { AxiosResponse, AxiosError } from "axios";
import { AuthMutationsList } from "@/store/modules/auth/mutations";

export enum AuthActionsList {
  SIGN_IN = "auth/SIGN_IN",
  SIGN_UP = "auth/SIGN_UP",
  SIGN_OUT = "auth/SIGN_OUT",
}

export const actions: ActionTree<AuthState, RootState> = {
  async SIGN_IN({ commit, dispatch }, authCredentialsDto: SigninCredentialsDto): Promise<boolean | string> {
    try {
      const response: AxiosResponse = await HttpClient.post("auth/signin", authCredentialsDto);
      const data: AuthState = response?.data;
      data.expiresIn *= 1000;
      if (data.expiresIn > 0) {
        console.log('timeout set');
        data.tokenTimer = setTimeout(() => {
          dispatch(AuthActionsList.SIGN_OUT, null, { root: true });
        }, data.expiresIn);
      }
      /* Set state */
      commit(AuthMutationsList.SET_STATE, data, { root: true });
      return true;
    } catch (e) {
      commit(HttpErrorMutationsList.SET_HTTP_ERROR, e, { root: true });
      return (e as AxiosError).response?.data?.message.toString() || "Sorry, error happened.";
    }
  },

  async SIGN_UP({ commit, dispatch, getters }, signupCredentialsDto: SignupCredentialsDto): Promise<boolean | string> {
    try {
      const response: AxiosResponse = await HttpClient.post("auth/signup", signupCredentialsDto);
      return response.status === 201;
    } catch (e) {
      commit(HttpErrorMutationsList.SET_HTTP_ERROR, e, { root: true });
      return (e as AxiosError).response?.data?.message.toString() || "Sorry, error happened.";
    }
  },

  SIGN_OUT({ commit }): void {
    commit(AuthMutationsList.RESET_STATE, null, { root: true });
  }
};
