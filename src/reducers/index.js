import { combineReducers } from 'redux'

import ui from './ui'
import { fetchStatus, fetchErrors } from './fetchStatus'

import user from './user'
import profiles from './profiles'

export default combineReducers({
	ui,
	fetchStatus,
	fetchErrors,
	
	user,
	profiles
})