import React from 'react'
import { Link } from 'react-router-dom'
import classNames from 'classnames'

//import { BurgerMenu } from './UI'

const links = [
	['/', 'Home'],
	['/hello', 'Hello']
	//['/faq', 'FAQ'],
	//['/blog', 'Blog']
]

const Navigation = props => <nav
	className={classNames(props.theme, {sticky: props.sticky ? props.sticky : false})}
	role="navigation"
>
	<div className="placeholder"></div>
	<div className="box p-x-3">
		<ul className="align-center-wrap float-l">
			<li className="font-size-10">My React App</li>
		</ul>
		<ul className="align-center-wrap float-r">
			{links.map(link => {
				const className = classNames('nav-btn', {
					active: props.page === link[0]
				})
				
				return <li key={link[0]} className={className}>
					<Link to={link[0]}>{link[1]}</Link>
				</li>
			})}
		</ul>
	</div>
</nav>


export default Navigation