import axios from "axios";
	
	const state = {
		token : ""
	};
	const getters = {
		token: (state) => state.token,
	};
	const actions = {
		async getTokenFromServer({commit}) {
			try {
				
				const response = await axios.get(
					`http://localhost:3000/auth/sing`
				);

				console.log(response.data);

				if (response.data){
					
						commit('SET_TOKEN', response.data);
					
				}

			}catch (err) {
				console.log(err);
			}
		}

	};

	const mutations = {
		SET_TOKEN(state, newtoken) {
			state.Token = newtoken.jwt;
			
		}

	};

	export default {
		namespaced: true,
		state : {
			...state
		},
		getters: {
			...getters
		},
		actions: {
			...actions
		},
		mutations: {
			...mutations
		}
	}
