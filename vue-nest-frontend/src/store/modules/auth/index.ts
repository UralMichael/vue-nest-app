import { Module } from "vuex";
import { AuthState } from "@/store/modules/auth/auth-state.model";
import { RootState } from "@/store/root-state.model";
import { actions } from "@/store/modules/auth/actions";
import { getters } from "@/store/modules/auth/getters";
import { mutations } from "@/store/modules/auth/mutations";

export const state: AuthState = {
  token: "",
  id: 0,
  expiresIn: 0,
  tokenTimer: 0,
};

const namespaced = true;

export const AuthModule: Module<AuthState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};
