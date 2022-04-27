import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

//import { BurgerMenu } from './UI'

const links = [
	['/', 'Home'],
	['/hello', 'Hello']
	//['/faq', 'FAQ'],
	//['/blog', 'Blog']
]

class Navigation extends React.Component {
	render() {
		return <nav className={classNames(this.props.mode, {sticky:this.props.sticky ? this.props.sticky : false})} role="navigation">
			<div className="placeholder"></div>
			<div className="box p-x-3">
				<ul className="align-wrap float-l">
					<li className="font-size-10">My React App</li>
				</ul>
				<ul className="align-wrap float-r">
					{links.map(link => {
						const className = classNames('nav-btn', {
							active: this.props.page === link[0]
						})
						
						return <li key={link[0]} className={className}>
							<Link to={link[0]}>{link[1]}</Link>
						</li>
					})}
				</ul>
			</div>
		</nav>
	}
}

const mapStateToProps = state => {
	return {
		loggedIn: state.user.loggedIn,
	}
}

export default connect(mapStateToProps)(Navigation)