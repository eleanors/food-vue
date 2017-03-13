import Vue from 'vue'
import Vuex from 'vuex'


import auth from './modules/auth'
import order from './modules/order'
import desk from './modules/desk'
import meal from './modules/meal'


Vue.use(Vuex)


const strict = process.env.NODE_ENV !== 'production'

const store = new Vuex.Store({

     modules: {

           // 模块status
           // .......
           auth,
           order,
           desk,
           meal
     },
     strict: strict
})


export default store