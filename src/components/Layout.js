import React from 'react'
import Navigation from './Navigation'

export default class Layout extends React.Component {
	render() {
		return <main>
			<Navigation />
			{this.props.children}
		</main>;
	}
}