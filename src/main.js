import Vue from 'vue'
import App from './App.vue'
import './assets/icon/iconfont.css'
import './plugins/element.js'
import ElementUI from 'element-ui';
import './style/element-variables.scss'
import router from './router/index'
import store from './store/index' //引入store
import 'babel-polyfill'
import promise from 'es6-promise'
import AMap from 'vue-amap';
import myCharts from '../public/mock/js/myCharts'
import Api from './api/index'
import Cookies from 'js-cookie'

Vue.prototype.$axios = Api
Vue.prototype.$Cookies = Cookies;
// Vue.prototype.$api = Api;
Vue.use(myCharts)
setTimeout(() => {
    localStorage.clear()
    Vue.use(AMap)
}, 0);



AMap.initAMapApiLoader({
    key: '383dcb6ce4f12e17006449a5b006245c',
    plugin: [''],
    v: '1.4.4'
});






promise.polyfill()
    // router.beforeEach((to, from, next) => {
    //   /* ??????????title */
    //   if (to.meta.title) {
    //     document.title = to.meta.title
    //   }
    //   next()
    // })
Vue.use(ElementUI);
Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
    // debugger
    // console.log(to);
    // console.log(from);
    if (Cookies.get('token')) {
        // console.log('?');
        next()
        if (to.path == '/login') {
            // console.log('111');
            next()
        }
    } else {
        // console.log('??');
        if (to.path === '/login') {
            next()
        }
        next({ path: '/login' })

    }
})

// console.log(Cookies.get('token'));



new Vue({
    router,
    store,
    render: h => h(App),

}).$mount('#app')