// noinspection NpmUsedModulesInstalled

import '@mdi/font/css/materialdesignicons.css'
import 'vuetify/styles'

import { createVuetify } from 'vuetify'

import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

// https://vuetifyjs.com/en/introduction/why-vuetify/#feature-guides
export const Vuetify = createVuetify({
    components,
    directives
})
