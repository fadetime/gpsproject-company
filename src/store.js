import Vue from 'vue'
import Vuex from 'vuex'

import axios from "axios";
import addConfig from "./assets/js/addConfig";
import _ from 'lodash'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0,
		username: '',
		useraddress: '',
		userphone: '',
		userpostcode: '',
		useremail: '',
		token: '',
		todayAllInfo: [],
		tempArr:{},
	},
	mutations: {
		newvalue(state, n) {
			state.count = n
		},
		newname(state, n) {
			state.username = n
		},
		newaddress(state, n) {
			state.useraddress = n
		},
		newphone(state, n) {
			state.userphone = n
		},
		newpostcode(state, n) {
			state.userpostcode = n
		},
		newemail(state, n) {
			state.useremail = n
		},
		newtoken(state, n) {
			state.token = n
		},
		getTodayInfo(state, payload) {
			state.todayAllInfo = payload
		},
		setTempArr:(state , item) => {
			state.tempArr = item
		},
	},
	actions: {
		getTodayInfo: ({ commit }, payload) => {
			commit('getTodayInfo', payload)
		},
		newtoken: ({ commit }, payload) => {
			commit('newtoken', payload)
		},
		setTempArr: ({ commit }, item) => {
			commit('setTempArr', item)
		},
	}
})
