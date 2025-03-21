import './assets/main.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/dark/css-vars.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router/index';
import LoadingPlugin from './plugins/loading'
import { useUserStore } from "./store//modules/user"
import pinia from "@/store/index"
const app = createApp(App)

app.use(ElementPlus)
app.use(router);
app.use(LoadingPlugin)
app.use(pinia)
useUserStore().initLoginState()

app.provide('redirectTo', (name: string) => {
    router.push(name);
});

app.mount('#app')