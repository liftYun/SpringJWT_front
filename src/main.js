// src/main.js
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import { refreshAccessToken } from "./services/auth";

async function bootstrap() {
  // 1) 새로고침 시 Refresh Token 쿠키로 Access Token 재발급
  await refreshAccessToken();
  // 2) Vue 앱 마운트
  createApp(App).use(router).mount("#app");
}

bootstrap();
