import * as types from '../type.js'

import {getCookie, setCookie, delCookie} from 'vendor/utils'

const state = {

      token: getCookie('token'),
      session: getCookie('session'),
      shopId: getCookie('shopId')
}


const getters = {

      session: state => state.session,
      shopId: state => state.shopId
}


const actions = {

      login({commit}, data){
            commit(types.LOGIN_SUCCESS, data)
      },

      logout({commit}){
            commit(types.LOGOUT_SHOP)
      },

      setShopSession({commit}, data){
            commit(types.SET_SHOP_SESSION, data)
      },

      setShopId({commit}, data){
            commit(types.SET_SHOPE_ID, data)
      },
      clearAuth({commit}){
            commit(types.CLEAR_SHOP_AUTH)
      },
      updateRoute({commit}, route){
            commit(types.ROUTE_UPDATE_ROUTE, route)
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

       [types.SET_SHOP_SESSION](state, data){
               state.session = data
               setCookie('session', data)
       },

       [types.SET_SHOPE_ID](state, data){
               state.shopId = data || ''
               setCookie('shopId', data)
       },

       [types.CLEAR_SHOP_AUTH](state){
               delCookie('session')
               delCookie('shopId')
       },

       [types.ROUTE_UPDATE_ROUTE](state, route){

       },
}


export default {
    state,
    getters,
    mutations,
    actions
}