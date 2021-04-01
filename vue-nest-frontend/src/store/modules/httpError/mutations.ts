import { MutationTree } from "vuex";
import { HttpErrorState } from "@/store/modules/httpError/httpError-state.model";
import { AxiosError } from "axios";

export enum HttpErrorMutationsList {
  SET_SNACKBAR = "httpError/setSnackbar",
  SET_HTTP_ERROR = "httpError/setHttpError",
}


// noinspection JSUnusedGlobalSymbols
export const mutations: MutationTree<HttpErrorState> = {
  setHttpError(state, payload: AxiosError) {
    console.log(payload);
    if (payload.response?.status) {
      state.code = +payload.response.status;
      state.message = payload.response?.data?.message || 'Server error';
    } else {
      state.code = 0;
      state.message = 'Client error';
    }
    state.snackbar = true;
  },
  setSnackbar(state, payload: boolean) {
    state.snackbar = payload;
  },
};
