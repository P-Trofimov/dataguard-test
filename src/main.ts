import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { MockApi } from "./clients/api";

MockApi.init().then(() => {
  createApp(App).use(router).use(store).mount("#app");
});
