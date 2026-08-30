import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import router from "./router/index"
import i18n from "./i18n"

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App);
app.use(router);
app.use(vuetify) // Use the router
app.use(i18n);
app.mount("#app");