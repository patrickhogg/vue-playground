require('./bootstrap');
window.Vue = require('vue');
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import BootstrapVue from 'bootstrap-vue'; //Importing
Vue.use(BootstrapVue)
Vue.component('top-nav', require('./components/top-nav').default);
Vue.component('left-nav', require('./components/left-nav').default);

Vue.component('breadcrumb', require('./components/parts/breadcrumb').default);

const Dashboard = { template: '<h1>Dashboard</h1>' }

const JobSite = { template: '<div>JobSite</div>' }
const Serviceorder = { template: '<div>Serviceorder</div>' }



const routes = [
  { path: '/', component: Dashboard },
  { path: '/client', component: require('./components/client-list').default },
  { path: '/jobsite', component: JobSite },
  { path: '/serviceorder', component: Serviceorder }
];
const router = new VueRouter({
   
  routes // short for `routes: routes`
})

const app = new Vue({
  router
}).$mount('#app')