import { MutationTree } from "vuex";
import { AuthState } from "@/store/modules/auth/auth-state.model";

export const STORAGE_AUTH_KEY = "vue-nest-app-auth";

function saveAuthState(key: string, state: AuthState) {
  window.localStorage.setItem(key, JSON.stringify(state));
}

export function getSavedState(key: string): AuthState | null {
  const storageItem = window.localStorage.getItem(key);
  if (!storageItem) {
    return null;
  }
  return  JSON.parse(storageItem);
}

export enum AuthMutationsList {
  SET_STATE = "auth/SET_CURRENT_USER",
  SET_STATE_FROM_STORAGE = "auth/SET_STATE_FROM_STORAGE",
  RESET_STATE = "auth/RESET_STATE",
}

export const mutations: MutationTree<AuthState> = {
  SET_CURRENT_USER(state, payload: AuthState) {
    console.log(payload);
    state.token = payload.token;
    state.id = payload.id;
    state.expiresIn = payload.expiresIn;
    state.tokenTimer = payload.tokenTimer;
    saveAuthState(STORAGE_AUTH_KEY, payload);
  },
  SET_STATE_FROM_STORAGE(state) {
    const storageState = getSavedState(STORAGE_AUTH_KEY);
    state.token = storageState?.token || "";
    state.id = storageState?.id || 0;
    state.expiresIn = storageState?.id || 0;
  },
  RESET_STATE(state) {
    state.token = "";
    state.id = 0;
    state.expiresIn = 0;
    clearTimeout(state.tokenTimer);
    state.tokenTimer = 0;
    window.localStorage.removeItem(STORAGE_AUTH_KEY);
  }
};
