import React from 'react'
import { Link } from 'react-router-dom'

const features = [
	{icon: 'headphones', text: 'Listen to your\nfavorite songs\ntogether'},
	{icon: 'envelope', text: 'Chat privately\nwith friends'},
	{icon: 'list', text: 'Create your own\nlistening room for you\nand your friends'},
	{icon: 'music', text: 'Music provided\nby SoundCloud\n& YouTube'},
	{icon: 'group', text: 'Create your own\nchat rooms'},
	{icon: 'headphones', text: 'Share your\nfavorite songs'}
]

export default class Landing extends React.Component {
	submit(e) {
		e.preventDefault()
		
		console.log('submitted')
	}
	
	renderFeatures() {
		let elements = features.map((feature, key) => {
			return <div key={key} className="col-6 feature">
				<i className={'fa fa-' + feature.icon}></i>
				<div className="description">
					{feature.text.split('\n').map((text, key) => {
						return <p key={key}>{text}</p>
					})}
				</div>
			</div>;
		})
		
		return <div className="row features">{elements}</div>
	}
	
	renderLoginForm() {
		return <form onSubmit={this.submit}>
			<input type="hidden" name="form_redirect" value="/" />
			<input type="hidden" name="form_token" value={this.props.token} />
			<input type="hidden" name="form_time" value={this.props.formTime} />
			<input type="text" name="form_login" placeholder="E-mail or Phone Number" value={this.props.login} />
			<input type="password" name="form_password" placeholder="Password" />
			<label>
				<input type="checkbox" name="form_remember" />
				<span>Remember Me</span>
			</label>
			<input type="submit" value="Login" />
		</form>;
	}
	
	renderForm() {
		return <form onSubmit={this.submit}>
			<input type="hidden" name="form_redirect" value="/" />
			<input type="hidden" name="form_token" value={this.props.token} />
			<input type="hidden" name="form_time" value={this.props.formTime} />
			<input type="text" name="form_name" placeholder="Name" value={this.props.name} />
			<input type="text" name="form_email" placeholder="E-mail Address" value={this.props.email} />
			<input type="password" name="form_password" placeholder="Password" />
			<button>SIGN UP</button>
		</form>;
	}
	
	render() {
		return <div className="landing" style={{backgroundImage: 'url(/static/i/welcome-screen-background.jpg)'}}>
			<div className="overlay" />
			<div className="gradient" />
			<div className="row header">
				<div className="col-2 col-offset-10">
					<button className="login-btn">LOGIN</button>
				</div>
			</div>
			<div className="row main">
				<div className="col-6 left">
					<div className="container">
						<h1>Music Share</h1>
						<div className="line" />
						<p className="description">Share and play music with your friends.</p>
						{this.renderFeatures()}
					</div>
				</div>
				<div className="col-4 col-offset-2 right">
					<div className="signup-container">
						<h3>Make a new account</h3>
						<div className="line" />
						{this.renderForm()}
					</div>
					<div className="divider">or</div>
					<button className="directory-view"><Link to={'/directory'}>View Directory</Link></button>
				</div>
			</div>
		</div>;
	}
}