import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// Modules import
import tasks from '@/store/modules/tasks.store';
import auth from '@/store/modules/auth.store';

export default new Vuex.Store({
	state: {},
	mutations: {},
	modules: {
		tasks: tasks,
		auth: auth
	}
})
