export const selectUser = (user) => {
	console.log('clicked ' + user.username)
	
	return {
		type: 'USER_CLICK',
		payload: user
	}
}