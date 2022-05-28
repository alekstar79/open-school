import { createApp } from 'vue'

import VueAxios from 'vue-axios'

import 'bootstrap/dist/css/bootstrap.min.css'

import axios from './plugins/axios'
import { Vuetify } from './plugins/vuetify'
import { FontAwesomeIcon } from './plugins/font-awesome'
import { loadFonts } from './plugins/webfontloader'

import App from './App.vue'
import router from './router'
import store from './store'

await loadFonts()

const app = createApp(App)

app.use(router)
app.use(store)
app.use(Vuetify)
app.use(VueAxios, axios)
app.provide('axios', app.config.globalProperties.axios)
app.component('font-awesome-icon', FontAwesomeIcon)
app.mount('#app')
