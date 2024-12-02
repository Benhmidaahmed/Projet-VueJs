import { createApp } from "vue";
import App from "./App.vue";
import router from "./router"; // This is the correct import for your router.js

createApp(App)
    .use(router)
    .mount("#app");
