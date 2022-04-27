import React from 'react'
import { connect } from 'react-redux'

import AppRoutes from './Routes'
import Html from './Html'

import { fetchUserData } from '../actions/user'

class Root extends React.Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		// run all one-time redux actions
		if (typeof window === 'undefined') return
		
		this.props.user.loggedIn && typeof this.props.user.profile.userId !== 'undefined' && this.props.dispatch(fetchUserData())
	}
	
	render() {
		return <Html
			assets={this.props.assets}
			title={this.props.title}
		>
			<AppRoutes />
		</Html>
	}
}

const mapStateToProps = state => {
	return {
		user: state.user
	}
}

export default connect(mapStateToProps)(Root)