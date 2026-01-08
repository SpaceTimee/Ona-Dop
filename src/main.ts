import { createApp } from 'vue'

import router from './plugins/router'
import vuetify from './plugins/vuetify'

import App from './App.vue'
import './assets/main.less'

createApp(App).use(router).use(vuetify).mount('#app')
