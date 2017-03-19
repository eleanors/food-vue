// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import App from './App'
import router from './router/router'
import store from './store'
import resource from 'vue-resource'
import VuexRouterSync from 'vuex-router-sync'

import Element from 'element-ui'
import 'assets/element-ui.scss'
// import 'element-ui/lib/theme-default/index.css'

const isMessage = true

function isObject (obj) {
    return obj !== null && typeof obj === 'object'
}

function resetElementName(Element){

    for(let name in Element){
        if(isObject(Element[name]) &&
           Object.prototype.hasOwnProperty.call(Element[name], 'name')){
                Element[name].name = Element[name].name.replace(/El/g, 'Ui')
        }
    }
}

resetElementName(Element)

Vue.prototype.msgbox = Element.MessageBox
Vue.prototype.notify  = Element.Notification;
Vue.prototype.message = Element.Message;

Vue.use(Element)
Vue.use(resource)


Vue.config.productionTip = false

//start debug mode
Vue.config.debug = true

// Resource Header Set
Vue.http.options.emulateJSON = true
Vue.http.options.emulateHTTP = true



Vue.http.interceptors.push((request, next) => {

        //request.method = 'POST',
        next((response) => {
                if(response.status == 400) {
                        isMessage && Vue.prototype.message({
                            type: 'error',
                            message: '请求出错, 再试试'
                        })
                }
                if(response.status == 404){

                        isMessage && Vue.prototype.message({
                            type: 'error',
                            message: '访问了不存在的API或页面'
                        })
                }
                if(response.status == 500){
                        isMessage && Vue.prototype.message({
                            type: 'error',
                            message: '服务器坏了, 等会再试'
                        })
                }
                if(response.data == null) {
                        Vue.prototype.message({
                            type: 'error',
                            message: '网络异常'
                        })
                }
                return response
        })
})

VuexRouterSync.sync(store, router)


// instance vue and mount
let V = new Vue({
      router: router,
      store: store,
      //components: { App }
      render: h => h(App)
}).$mount('.Food')