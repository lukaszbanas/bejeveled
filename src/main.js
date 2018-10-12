import Vue from 'vue'
import App from './App.vue'
import RouteGame from './components/RouteGame'
import RouteLoadGame from './components/RouteLoadGame'
import RouteHighscores from './components/RouteHighscores'
import store from './store'
import VueRouter from 'vue-router'

Vue.config.productionTip = false
Vue.use(VueRouter)

const routes = [
    { path: '/', component: RouteGame },
    { path: '/load', component: RouteLoadGame },
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
