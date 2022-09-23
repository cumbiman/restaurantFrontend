import { createApp } from "vue";
import App from "./App.vue";

import "./assets/main.css";

const app = createApp(App);

app.config.errorHandler = (err) => {
  console.error("Application-wide error: ", err.message);
};

app.mount("#app");
