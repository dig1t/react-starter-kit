import {
	UI_GOOGLE_READY
} from '../constants/actionTypes.js'

export default (state = {
	googleReady: false
}, action) => {
	switch(action.type) {
		case UI_GOOGLE_READY: {
			return {
				...state,
				googleReady: action.payload
			}
		}
		default: {
			return state
		}
	}
}