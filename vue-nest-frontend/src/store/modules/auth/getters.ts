import { GetterTree } from "vuex";
import { AuthState } from "@/store/modules/auth/auth-state.model";
import { RootState } from "@/store/root-state.model";

export enum AuthGettersList {
  IS_LOGGED_IN = "auth/IS_LOGGED_IN",
}

export const getters: GetterTree<AuthState, RootState> = {
  IS_LOGGED_IN(state): boolean {
    return !!state.token;
  }
};
