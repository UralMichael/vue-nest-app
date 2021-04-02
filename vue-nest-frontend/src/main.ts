import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";
import { AuthMutationsList } from "@/store/modules/auth/mutations";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
  created() {
    this.$store.commit(AuthMutationsList.SET_STATE_FROM_STORAGE);
  },
}).$mount("#app");
