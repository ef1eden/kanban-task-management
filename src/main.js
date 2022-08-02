import { createApp } from 'vue'
import App from './App.vue'
import store from './store'
import UUID from "vue3-uuid";

createApp(App).use(store).use(UUID).mount('#app')
