import {setStore, getStore} from 'vendor/utils'
import * as types from '../type.js'

const state = {

        miniFood: {},
        foodCount: null,
        foodListCount: null
}


const getters = {

    isEmpty: state => {

    },

    foodCount: state => state.foodCount,

    miniFood: state => state.miniFood

}



const actions = {

    initMiniFood({commit}, shopId){
        commit(types.MINIFOOD_INIT_FOOD)
    },

    addFood({commit}, {shopId, cateId, food}){

        commit(types.MINIFOOD_ADD_FOOD, {shopId, cateId, food})
    },

    reduceFood({commit}, {shopId, cateId, food}){
        commit(types.MINIFOOD_REDUCE_FOOD, {shopId, cateId, food})
    },

    clearFood({commit}, shopId){
        commit(types.MINIFOOD_CLEAR_FOOD, shopId)
    },

    calcQuantity({commit}, shopId){
        commit(types.CALC_MINIFOOD_QUANTITY, shopId)
    }
}

const mutations = {

    // 初始化 miniFood
    [types.MINIFOOD_INIT_FOOD](state) {
            let miniFoodStore = getStore('miniFoodStore')

            if(miniFoodStore) {
                    state.miniFood = JSON.parse(miniFoodStore);
            }
    },

    [types.MINIFOOD_ADD_FOOD](state, {shopId, cateId, food}) {
        let foodCollect = state.miniFood
        if( state.miniFood[shopId] ) {
                let cateIndex = []
                let cateList = state.miniFood[shopId][cateId]


                if(cateList && cateList.length){
                        cateList.forEach( (item, index) => {
                                if(cateList.indexOf(food)>-1) {
                                        if(item.id == food.id) item.quantity++
                                }else{
                                        food.quantity++
                                        cateList.push(food)
                                }
                        })
                }else {
                        state.miniFood[shopId][cateId] = []
                        food.quantity++
                        state.miniFood[shopId][cateId].push(food)
                }
        }else {
                state.miniFood[shopId] = {}
                state.miniFood[shopId][cateId] = []
                food.quantity++
                state.miniFood[shopId][cateId].push(food)
        }

        state.miniFood = Object.assign({}, foodCollect);

        setStore('miniFoodStore', state.miniFood)
    },

    [types.MINIFOOD_REDUCE_FOOD](state, {shopId, cateId, food}) {
        let foodCollect = state.miniFood
        if( state.miniFood[shopId] && state.miniFood[shopId][cateId]) {
                let cateList = state.miniFood[shopId][cateId]
                if(cateList && cateList.length){

                        cateList.forEach( (item, index) => {

                                if(cateList.indexOf(food)>-1) {
                                        if(item.id == food.id) item.quantity--
                                }
                                if(item.quantity === 0){
                                        cateList.splice(index, 1)
                                }
                        })
                }
        }
        state.miniFood = Object.assign({}, foodCollect);

        setStore('miniFoodStore', state.miniFood)
    },

    [types.MINIFOOD_CLEAR_FOOD](state, shopId){
            if( shopId && state.miniFood[shopId]) {
                    Object.keys(state.miniFood[shopId]).forEach( (cateId, index)=> {
                            let cateList = state.miniFood[shopId][cateId]
                            if(cateList && cateList.length){
                                    cateList.forEach( (food)=> {
                                            food.quantity = 0
                                    })
                            }
                    })
            }
            state.miniFood[shopId] = {}
            setStore('miniFoodStore', state.miniFood)
    },

    [types.CALC_MINIFOOD_QUANTITY](state, shopId){
        if( shopId && state.miniFood[shopId]) {
                let quantity = 0
                for(let cate in state.miniFood[shopId]){

                        let cateList = state.miniFood[shopId][cate]
                        if(cateList.constructor == Array && cateList.length){
                                for(let i=0; i<cateList.length; i++){

                                        quantity += cateList[i].quantity
                                }
                        }
                }
                state.foodCount = quantity;
        }else {
                state.foodCount = 0;
        }
    }
}

export default {
    state,
    getters,
    mutations,
    actions
}