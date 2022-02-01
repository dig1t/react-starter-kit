import React from 'react'
import { connect } from 'react-redux'

import Routes from './Routes'

import { googleReady } from '../actions/uiEvents.js'
import { fetchUserData } from '../actions/user'

class Root extends React.Component {
	constructor(props) {
		super(props)
	}
	
	componentDidMount() {
		// run all one-time redux actions
		
		if (typeof window === 'undefined') return
		
		/*!this.props.googleReady && window.google ? this.props.dispatch(googleReady(true)) : window.mapsCallback = () => {
			this.props.dispatch(googleReady(true))
		}
		
		this.props.user.loggedIn && typeof this.props.user.profile.userId !== 'undefined' && this.props.dispatch(fetchUserData())*/
	}
	
	render() {
		return <Routes />
	}
}

const mapStateToProps = state => {
	return {
		user: state.user,
		googleReady: state.ui.googleReady
	}
}

export default Root