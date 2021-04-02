import { Module } from "vuex";
import { AuthState } from "@/store/modules/auth/auth-state.model";
import { RootState } from "@/store/root-state.model";
import { actions } from "@/store/modules/auth/actions";
import { getters } from "@/store/modules/auth/getters";
import { mutations, getSavedState, STORAGE_AUTH_KEY } from "@/store/modules/auth/mutations";

// TODO check if it's legal
const savedState = getSavedState(STORAGE_AUTH_KEY);

export const state: AuthState = {
  token: savedState?.token || "",
  id: savedState?.id || 0,
  expiresIn: savedState?.expiresIn || 0,
  tokenTimer: 0,
};

// export const state: AuthState = {
//   token: "",
//   id: 0,
//   expiresIn: 0,
//   tokenTimer: 0,
// };

const namespaced = true;

export const AuthModule: Module<AuthState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};
