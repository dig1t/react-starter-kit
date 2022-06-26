import React from 'react'
import Layout from '../Layout'
//import Navigation from '../Navigation'

import Footer from '../Footer'

export default class Landing extends React.Component {
	// stickyNav = <Navigation page="/" theme="dark" sticky={false} />
	
	render() {
		return <Layout page="landing">
			<section className="hero">
				<div className="box align-center-wrap">
					<div className="grid">
						<div className="gi-xl">
							Hello World
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</Layout>
	}
}