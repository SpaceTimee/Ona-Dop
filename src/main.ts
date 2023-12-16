import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'

import router from './plugins/router'
import pinia from './plugins/pinia'
import vuetify from './plugins/vuetify'

createApp(App).use(router).use(pinia).use(vuetify).mount('#app')
