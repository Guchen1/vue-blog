import { createApp } from 'vue'
import store from './store'
import App from './App.vue'
import ElementPlus from 'element-plus'
import 'element-plus/theme-chalk/index.css'
import axios from 'axios'
import router from './router'
import VueCookies from 'vue-cookies'
import 'element-plus/theme-chalk/dark/css-vars.css'
//import 'default-passive-events'
//import VConsole from 'vconsole'
const app = createApp(App)

//const vConsole = new VConsole()
//console.log(vConsole)


app.use(router).use(ElementPlus).use(store).use(VueCookies, { expire: '7d' })
axios.defaults.withCredentials = true
if (process.env.NODE_ENV == 'development') {
    app.config.globalProperties.$server = "http://192.168.31.88:8081"
} else {
    app.config.globalProperties.$server = "http://124.223.53.17:8081"
}

app.config.globalProperties.$axios = axios;
app.mount('#app')