import Vue from "vue";
import Vuex, { StoreOptions } from "vuex";
import { RootState } from "@/store/root-state.model";
import { AuthModule } from "@/store/modules/auth";
import { HttpErrorModule } from "@/store/modules/httpError";

Vue.use(Vuex);

const store: StoreOptions<RootState> = {
  state: {
    version: "0.0.1", // a simple property
  },
  modules: {
    auth: AuthModule,
    httpError: HttpErrorModule
  },
};

export default new Vuex.Store<RootState>(store);
