import * as types from '../type.js'

import {getCookie} from 'vendor/utils'

const state = {

      token: getCookie('token') || null,
      session: getCookie('session') || null,
      shopInfo: null
}


const getters = {

      shopInfo: state => state.shopInfo
}


const actions = {

      login({commit}, data){
            commit(types.LOGIN_SUCCESS, data)
      },

      logout({commit}){
            commit(types.LOGOUT_SHOP)
      },

      setShopInfo({commit}, data){
            commit(types.SETSHOPINFO, data)
      }
}


const mutations = {

       [types.LOGIN_SUCCESS](state, data){
               state.token = data.token
               state.session = data.session
       },

       [types.LOGOUT_SHOP](state, data){
               state.token = null
               state.session = null
       },

       [types.SETSHOPINFO](state, data){
               state.shopInfo = data
       }
}


export default {
    state,
    getters,
    mutations,
    actions
}