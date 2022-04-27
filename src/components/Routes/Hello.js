import React from 'react'
import Layout from '../Layout'
//import Navigation from '../Navigation'

import Footer from '../Footer'

export default class Landing extends React.Component {
	render() {
		return <Layout className="landing">
			<section className="hero">
				<div className="box align-wrap">
					<div className="grid">
						<div className="gi-xl">
							<p>Hello! 👋</p>
						</div>
					</div>
				</div>
			</section>
			<Footer />
		</Layout>
	}
}