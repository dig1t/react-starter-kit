import React from 'react'
import { connect } from 'react-redux'

import Navigation from './Navigation'

@connect((store) => {
	return {
		users: store.users.users
	}
})

export class App extends React.Component {
	render() {
		return [
			<Navigation />,
			<UserList />
		]
	}
}