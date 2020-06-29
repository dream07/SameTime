import Vue from 'vue';
import Vuex from 'vuex';
import Cookies from 'js-cookie'
import { defaultRouter, addRouter } from '../router/index'
Vue.use(Vuex);
const store = new Vuex.Store({
    state: {
        token: Cookies.get('token'),
        token: '',
        bussiness: '',
        isCollapse: false,
        logoShow: false,
        uniquerouter: true,
        rightNav: {},
        routers: [],
        addRouters: [],
        tabnavBox: [
            {
                title: '主页',
                path: '/index',
                query:{
                    globId:''
                }
            }

        ]
    },
    getters: {
        isCollapse: state => {
            return state.isCollapse
        },
        logoShow: state => {
            return state.logoShow
        },
        token: state => {
            return state.token
        },
        bussiness: state => {
            return state.bussiness
        },
        tabnavBox: state => {
            return state.tabnavBox
        },
        uniquerouter: state => {
            return state.uniquerouter
        },
        routers: state => {
            return state.routers
        },
        rightNav: state=> {
            return state.rightNav
        }
        
    },
    mutations: {
        // setRouters: (state, routers) => {
        //     state.addRouters = routers  // 保存动态路由用来addRouter
        //     
        //     state.routers = defaultRouter.concat(routers); // 所有有权限的路由表，用来生成菜单列表
        //     

        // },
        openMenu(state, arg) {
            
            state.rightNav = arg
        },
        addTab(state, arg) {
            
            
            state.isActive = arg.path
            
            
            for (let i = 0; i < state.tabnavBox.length; i++) {
                
                
                
                if (state.tabnavBox[i].path === arg.path) {
                        state.tabnavBox[i].query.globId = arg.query.globId
                    return false
                }
            }
            state.tabnavBox.push({
                title: arg.title,
                path: arg.path,
                query: arg.query
            })
            
        },
        removeTab(state, arg) {
            
            let index = state.tabnavBox.findIndex(function (value, key) {
                
                
                
                
                return value.path === arg.tabItem.path
            })
            
            state.tabnavBox.splice(index, 1)
            
            
            // if (arg.tabItem.path === arg.tabItem.path) {
                
                
                let tabActive = state.tabnavBox[index] || state.tabnavBox[index - 1]
                arg.router.push({
                    title: tabActive.title,
                    path: tabActive.path,
                    query: tabActive.query
                })
            // }
        },
        removeOtherTab(state, arg) {
            
            state.tabnavBox = [{
                title: '主页',
                path: '/index',
                query:{
                    globId:''
                }
            }]
            if (arg.all) {
                arg.router.push('/index')
                return false
            }
            
            state.tabnavBox.push(arg.tabItem)
            arg.router.push(arg.fullPath)
        },
        collapse(state) {
            state.isCollapse = !state.isCollapse
            if (state.logoShow) {
                setTimeout(function () {
                    state.logoShow = false
                }, 300)
            } else {
                state.logoShow = true
            }
        },
        setToken(state, token) {
            state.token = token
            Cookies.set('token', token, { expires:24 });
        },
        setbussiness(state, bussiness) {
            state.bussiness = bussiness
            Cookies.set('bussiness', bussiness, { expires:24 });
        }
    },
    actions: {
        newRoutes({ commit }, perRouter) {
            //  通过递归路由表，删除掉没有权限的路由
            function eachSelect(routers, userRole) {
                for (let j = 0; j < routers.length; j++) {
                    if (routers[j].r_id && userRole.indexOf(routers[j].r_id.toString()) === -1) {
                        routers.splice(j, 1)
                        j = j - 1
                    }
                    if (routers[j] && routers[j].children && routers[j].children.length) {
                        eachSelect(routers[j].children, userRole)
                        if (!routers[j].children.length) {
                            routers.splice(j, 1)
                            j = j - 1
                        }
                    }
                }
            }
            // if (store.getters.info.role !== '超级管理员') {
            //     eachSelect(addRouter, perRouter)
            // }
            commit('setRouters', addRouter)

        },
        collapse({ commit }, arg) {
            commit('collapse', arg)
        },
        addTab({ commit }, arg) {
            commit('addTab', arg)
        },
        removeTab({ commit }, arg) {
            commit('removeTab', arg)
        },
        removeOtherTab({ commit }, arg) {
            commit('removeOtherTab', arg)
        },
        openMenu({ commit }, arg) {
            commit('openMenu', arg)
        },
        setToken({ commit }, token) {
            commit('setToken', token)
        },
        setbussiness({ commit }, bussiness) {
            commit('setbussiness', bussiness)
        }
    },

});

export default store;