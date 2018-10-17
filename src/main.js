import Vue from 'vue'
import App from './App.vue'
import RouteGame from './components/RouteGame'
import RouteHighscores from './components/RouteHighscores'
import store from './store'
import VueRouter from 'vue-router'
import GoogleAuth from 'vue-google-oauth'
import VueNativeSock from 'vue-native-websocket'

Vue.config.productionTip = false
Vue.use(VueRouter)

Vue.use(GoogleAuth, { client_id: process.env.VUE_APP_GOOGLE_OAUTH_CLIENT_ID })
Vue.googleAuth().load()

Vue.use(VueNativeSock, 'ws://localhost:3000', {
    connectManually: true,
    store: store,
    format: 'json',
    passToStoreHandler: function (eventName, event) {
        if (!eventName.startsWith('SOCKET_')) { return }

        let target = eventName.toUpperCase()
        this.store['commit']('ws/' + target, event)
    }
})

const routes = [
    { path: '/', name: 'home', component: RouteGame },
    { path: '/highscores', component: RouteHighscores },
]

const router = new VueRouter({
    routes // short for `routes: routes`
})

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app')
