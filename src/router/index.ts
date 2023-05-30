import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import TabView from "../views/TabView.vue";

const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    redirect: "/tab/tab1",
  },
  {
    path: "/tab/:tabId",
    name: "TabView",
    component: TabView,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
