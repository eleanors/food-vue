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
// Vue.http.options.root = '/src';
Vue.http.options.xhr = {withCredentials: true}
Vue.http.options.shopId = 13
Vue.http.options.session = 'MTg0MDQ5ODU5MzY7NzU3MEZBN0QzNEQxRjkxOTU5QzRGRTc3OTE2MzIxRTQ7MQ'
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk'


Vue.http.interceptors.push((request, next) => {
        //request.method = 'POST',
        next((response) => {
                if(response.status == 400) {

                        throw new Error('request exception...')
                }
                if(response.status == 404){

                        throw new Error(request.url +' is not found...')
                }
                if(response.status == 500){

                        throw new Error('Service error request fail...')
                }
                if(response.data == null) {

                        console.log('Internet Exception....')
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