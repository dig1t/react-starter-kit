import React, { useState } from 'react'
import { Navigate } from 'react-router-dom'
import PropTypes from 'prop-types'
import axios from 'axios'

import { Input } from '../components/UI'

class AuthForm extends React.Component {
	constructor(props) {
		super(props)
		
		this.state = {
			form: {},
			isValid: {}, // all required inputs must be valid to enable submit button
			inputProps: {},
			
			okForHTTP: false,
			redirect: false,
			redirectUrl: '/',
			apiUrl: null,
			authError: false,
			authMessage: ''
		}
		
		this.props.inputs.map(input => {
			this.state.form[input.name] = '',
			this.state.isValid[input.name] = input.optional || false,
			this.state.inputProps[input.name] = {
				...input,
				handleValidity: this.handleValidity,
				onChange: this.handleInputChange
			}
		})
	}
	
	componentDidMount() {
		this.mounted = true
	}
	
	componentWillUnmount() {
		this.mounted = false
	}
	
	// ONLY STORES THE INPUT TEXT, DOES NOT MODIFY ANY INPUTS
	handleInputChange = event => {
		const target = event.target
		
		this.setState(state => (state.form[target.name] = target.type === 'checkbox' ? target.checked : target.value, state))
	}
	
	handleValidity = (name, value) => {
		this.setState(state => (state.isValid[name] = value, state), () => {
			let okForHTTP = true
			
			for (let val in this.state.isValid) {
				if (this.state.isValid[val] !== true) {
					okForHTTP = false
					break
				}
			}
			
			console.log('validity change');
			this.setState({ okForHTTP })
		})
	}
	
	handleSubmit = event => {
		event.preventDefault()
		
		// only post if all inputs are valid
		if (this.state.okForHTTP) axios.post({
			url: this.state.apiUrl,
			data: this.state.form,
			headers: {'Content-Type': 'application/json'}
		})
			.then(response => {
				if (response.data.success) {
					this.props.fetchUserData()
					this.props.setAuthStatus(true) // re-renders react router which has the PrivateRoute that will redirect us out of the page
					if (this.mounted) this.setState({ redirect: true })
				} else {
					this.setState({
						authError: true,
						authMessage: response.data.message,
						okForHTTP: false,
						form: {
							...this.state.form,
							password: ''
						}
					})
				}
			})
			.catch(error => {
				console.error(error)
			})
	}
	
	getInputProps(name) {
		return this.state.inputProps[name]
	}
	
	render() {
		return <form onSubmit={this.handleSubmit}>
			{this.state.redirect ? <Navigate to={this.state.redirectUrl} /> : null}
			{this.state.authError ? (<div className="auth-error error">{this.state.authMessage}</div>) : null}
			
			{Object.keys(this.state.inputProps).map(input => <label key={input}>
				<span>{this.state.inputProps[input].label}</span>
				<Input {...this.state.inputProps[input]}
					value={this.state.form[input]}>
				</Input>
			</label>)}
			
			<button type="submit" disabled={!this.state.okForHTTP}>{this.state.buttonText}</button>
		</form>
	}
}

AuthForm.propTypes = {
	inputs: PropTypes.array.isRequired,
	apiUrl: PropTypes.string.isRequired
}

export default AuthForm