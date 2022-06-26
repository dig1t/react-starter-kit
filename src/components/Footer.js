import React from 'react'
import { Link } from 'react-router-dom'

import SocialLinks from './SocialLinks'

const links = [
	['/', 'Home'],
	['/hello', 'Hello']
	//['/blog', 'Blog'],
	//['/faq', 'FAQ'],
	//['/contact', 'Contact'],
	//['/legal', 'Legal'],
	//['/privacy', 'Privacy']
]

const LinksContainer = () => <div className="grid text-center">
	{links.map(link => <div key={link[0]} className="col-12 p-y-1">
		<Link to={link[0]}>{link[1]}</Link>
	</div>)}
</div>

const Footer = () => <footer className="p-y-2">
	<div className="grid">
		<div className="col-6 offset-1">
			<div className="col-12">
				<LinksContainer/>
			</div>
		</div>
		<div className="col-4">
			<SocialLinks />
			<div className="info text-center">
				<p className="m-y-1">
					<i className="fas fa-envelope"></i> admin@javierm.net
				</p>
				<p className="m-y-1">
					<i className="fas fa-phone fa-flip-horizontal"></i> +1-800-777-3333
				</p>
			</div>
		</div>
		<div className="col-10 offset-1 copyright text-center font-size-10 p-1">©{(new Date()).getFullYear()} JM Tech, LLC</div>
	</div>
</footer>

export default Footer