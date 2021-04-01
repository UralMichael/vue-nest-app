import { Module } from "vuex";
import { HttpErrorState } from "@/store/modules/httpError/httpError-state.model";
import { RootState } from "@/store/root-state.model";
import { actions } from "@/store/modules/httpError/actions";
import { getters } from "@/store/modules/httpError/getters";
import { mutations } from "@/store/modules/httpError/mutations";

export const state: HttpErrorState = {
  snackbar: false,
  code: 0,
  message: "",
};

const namespaced = true;

export const HttpErrorModule: Module<HttpErrorState, RootState> = {
  namespaced,
  state,
  actions,
  getters,
  mutations,
};
