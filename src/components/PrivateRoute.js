import React from 'react'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

class PrivateRoute extends React.Component {
	constructor(props) {
		super(props)
	}
	
	render() {
		const {redirectTo, requireAuth, requireNoAuth} = this.props
		const canRender = (requireAuth && this.props.loggedIn) || (requireNoAuth && !this.props.loggedIn)
		
		return canRender ? this.props.children : <Navigate to={redirectTo} />
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.user.loggedIn,
	}
}

export default connect(mapStateToProps)(PrivateRoute)