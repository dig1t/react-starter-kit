import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Router, Route, Switch } from 'react-router'
import { createBrowserHistory } from 'history'
import { Provider } from 'react-redux'
import PropTypes from 'prop-types'

import Landing from './Landing'
import Login from './Login'
import Directory from './Directory'
import Error from './Error'

const history = createBrowserHistory()

export default class Root extends React.Component {
	static propTypes = {
		store: PropTypes.object.isRequired
	}
	
	render() {
		return <Provider store={this.props.store}>
			<Router history={history}>
				<Switch>
					<Route exact path="/" component={Landing} />
					<Route exact path="/login" component={Login} />
					<Route exact path="/directory" component={Directory} />
					<Route component={Error} />
				</Switch>
			</Router>
		</Provider>;
	}
}