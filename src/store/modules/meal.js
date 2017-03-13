import * as types from '../type.js'

import { getCookie } from 'vendor/utils'

const state = {
	addStatus: false
}

const getters = {

}

const mutations = {
	[types.MEAL_ADD_MODAL](state, status) {
		state.addStatus = status;
	}
}

const actions = {

}

export default {
	state,
	getters,
	mutations,
	actions
}