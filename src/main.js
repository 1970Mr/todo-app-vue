import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import './assets/main.css'
// import 'boxicons'
import 'boxicons/css/boxicons.min.css';

const app = createApp(App)

app.use(createPinia())

app.mount('#app')
