import { GetterTree } from "vuex";
import { HttpErrorState } from "@/store/modules/httpError/httpError-state.model";
import { RootState } from "@/store/root-state.model";

export enum HttpErrorGettersList {
  GET_ERROR_TEXT = "httpError/getErrorText",
}

export const getters: GetterTree<HttpErrorState, RootState> = {
  getErrorText(state): string {
    if (state.code != 0) {
      return `Server error [${state.code}]: ${state.message}`
    }
    return state.message;
  }
};
