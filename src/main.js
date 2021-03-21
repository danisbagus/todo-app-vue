import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ApiService from "./config/api.service";

import "./assets/css/tailwind.css";

ApiService.init();

createApp(App)
  .use(store)
  .use(router)
  .mount("#app");
