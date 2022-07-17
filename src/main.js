import { createApp } from 'vue'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
import 'default-passive-events'
//import VConsole from 'vconsole'
const app = createApp(App)
    //const vConsole = new VConsole()
    //console.log(vConsole)
app.use(router).use(ElementPlus)
app.mount('#app')
app.config.globalProperties.$server = "http://124.223.53.17:8080/"
app.config.globalProperties.$axios = axios;