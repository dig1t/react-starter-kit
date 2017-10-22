import axios from 'axios'

export function fetchUsers() {
	return function(dispatch) {
		acios.get('https://jsonplaceholder.typicode.com/users')
			.then((response) => {
				dispatch({type: 'FETCH_USERS_SUCCESS', payload: response.data})
			})
			.catch((err) => {
				dispatch({type: 'FETCH_USERS_ERROR', payload: err})
			})
	}
}