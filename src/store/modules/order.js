import {setStore, getStore} from 'vendor/utils'
import * as types from '../type.js'

const state = {
        // 添加菜品
        miniFood: {},
        foodCount: null,

        orderDetail: null
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

    addFood({commit}, {shopId, cateId, foodId, food}){

        commit(types.MINIFOOD_ADD_FOOD, {shopId, cateId, foodId, food})
    },

    reduceFood({commit}, {shopId, cateId, foodId, food}){
        commit(types.MINIFOOD_REDUCE_FOOD, {shopId, cateId, foodId, food})
    },

    clearFood({commit}, shopId){
        commit(types.MINIFOOD_CLEAR_FOOD, shopId)
    },

    calcQuantity({commit}, shopId){
        commit(types.CALC_MINIFOOD_QUANTITY, shopId)
    }
}

/*
{shopId-1: {cateA: {itemId-1: {}itemId-2: {}},cateB: {itemId-1: {}itemId-2: {}}}}
*/

const mutations = {

    // 初始化 miniFood
    [types.MINIFOOD_INIT_FOOD](state) {
            let miniFoodStore = getStore('miniFoodStore')

            if(miniFoodStore) {
                    state.miniFood = JSON.parse(miniFoodStore);
            }
    },

    [types.MINIFOOD_ADD_FOOD](state, {shopId, cateId, foodId, food}) {
        let foodCollect = state.miniFood

        if( state.miniFood[shopId] ) {
                    // 所有分类
                    let cateList = state.miniFood[shopId]
                    if(cateList.hasOwnProperty(cateId)){
                            let itemList = cateList[cateId]
                            if(itemList.hasOwnProperty(foodId)){
                                    itemList[foodId].quantity++
                            }else{
                                    food.quantity++
                                    itemList[foodId] = {}
                                    for(let attr in food){
                                        itemList[foodId][attr] = food[attr]
                                    }
                            }
                    }else{
                            food.quantity++
                            cateList[cateId] = {}
                            cateList[cateId][foodId] = {}
                            for(let attr in food){
                                cateList[cateId][foodId][attr] = food[attr]
                            }
                    }
        }else {
                food.quantity++
                state.miniFood[shopId] = {}
                state.miniFood[shopId][cateId] = {}
                state.miniFood[shopId][cateId][foodId] = {}
                for(let attr in food){
                    state.miniFood[shopId][cateId][foodId][attr] = food[attr]
                }
        }

        state.miniFood = Object.assign({}, foodCollect);

        setStore('miniFoodStore', state.miniFood)
    },

    [types.MINIFOOD_REDUCE_FOOD](state, {shopId, cateId, foodId, food}) {
        let foodCollect = state.miniFood
        let cateList = state.miniFood[shopId]

        if( cateList && cateList[cateId] && cateList[cateId][foodId]) {
                if( cateList[cateId][foodId].quantity>0){

                        cateList[cateId][foodId].quantity--
                        state.miniFood = Object.assign({}, foodCollect);
                        setStore('miniFoodStore', state.miniFood)
                }else{
                        cateList[cateId][foodId].quantity = 0
                }
        }
    },

    [types.MINIFOOD_CLEAR_FOOD](state, shopId){
            if( shopId && state.miniFood[shopId]) {

                    Object.values(state.miniFood[shopId]).forEach( (cate)=>{

                            Object.values(cate).forEach( (item)=>{
                                    item.quantity = 0
                            })
                    })
            }
            state.miniFood[shopId] = {}
            setStore('miniFoodStore', state.miniFood)
    },

    [types.CALC_MINIFOOD_QUANTITY](state, shopId){
        if( shopId && state.miniFood[shopId]) {
                let quantity = 0
                Object.values(state.miniFood[shopId]).forEach( (cate)=>{

                        Object.values(cate).forEach( (item)=>{
                                quantity += item.quantity
                        })
                })
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