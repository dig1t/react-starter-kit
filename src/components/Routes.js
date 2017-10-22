import React from 'react'
import { Router, Route, Switch } from 'react-router'

import Landing from './Landing'
import Login from './Login'
import Directory from './Directory'

export default class Routes extends React.Component {
	render() {
		return <Switch>
			<Route exact path="/" component={Landing} />
			<Route exact path="/login" component={Login} />
			<Route exact path="/directory" component={Directory} />
		</Switch>;
	}
}