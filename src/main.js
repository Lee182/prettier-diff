// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

import PortalVue from 'portal-vue'
import {
 Vuetify,
 VApp,
 VNavigationDrawer,
 VFooter,
 VList,
 VBtn,
 VSelect,
 VToolbar
} from 'vuetify/es5/components'

Vue.use(Vuetify, {
  components: {
    VApp,
    VNavigationDrawer,
    VFooter,
    VList,
    VBtn,
    VSelect,
    VToolbar
  }
})

Vue.use(PortalVue)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
