import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		count: 0,
		username:'',
		useraddress:'',
		userphone:'',
		userpostcode:'',
		useremail:'',
		token:''
	},
	mutations: {
		newvalue(state,n){
			state.count = n
		},
		newname(state,n){
			state.username = n
		},
		newaddress(state,n){
			state.useraddress = n
		},
		newphone(state,n){
			state.userphone = n
		},
		newpostcode(state,n){
			state.userpostcode = n
		},
		newemail(state,n){
			state.useremail = n
		},
		newtoken(state,n){
			state.token = n
		}
	},
	actions: {

	}
})
