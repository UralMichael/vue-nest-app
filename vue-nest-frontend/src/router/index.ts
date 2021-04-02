import Vue from "vue";
import VueRouter, { RouteConfig } from "vue-router";
import Home from "@/views/Home.vue";
import Page404 from "@/views/Page404.vue";
import store from "@/store";
import { AuthGettersList } from "@/store/modules/auth/getters";

Vue.use(VueRouter);

const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/about",
    name: "About",
    component: () => import("../views/About.vue"),
  },
  {
    path: "/signin",
    name: "SignIn",
    component: () => import("../views/SignIn.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/signup",
    name: "SignUp",
    component: () => import("../views/SignUp.vue"),
    meta: {
      requiresGuest: true,
    },
  },
  {
    path: "/404",
    name: "404",
    component: Page404,
  },
  {
    path: '*',
    redirect: '404',
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach(((to, from, next) => {
  const isLoggedIn = store.getters[AuthGettersList.IS_LOGGED_IN];
  console.log(isLoggedIn);
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isLoggedIn) {
      /* Redirect to the Login Page */
      next('/signin');
    } else {
      next();
    }
  } else if (to.matched.some(record => record.meta.requiresGuest)) {
    if (isLoggedIn) {
      /* Redirect to the Main Page */
      next('/');
    } else {
      next();
    }
  } else {
    next();
  }
}));

export default router;
