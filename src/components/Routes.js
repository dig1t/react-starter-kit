import React from 'react'
import { Route, Routes } from 'react-router-dom'

import PrivateRoute from './PrivateRoute'

import Error from './Routes/Error'
import Landing from './Routes/Landing'
import Login from './Routes/Login'
import Hello from './Routes/Hello'

//<PrivateRoute exact path="/my/settings" component={UserSettings} requireAuth={true} redirect="/login" />
//<PrivateRoute exact path="/login" component={Login} requireNoAuth={true} redirect="/" />
//<PrivateRoute exact path="/me" component={UserProfile} requireAuth={true} redirect="/login" />

const AppRoutes = () => <Routes>
	<Route exact path="/" element={<Landing />} />
	<Route exact path="/hello" element={<Hello />} />
	
	<Route path="/login" element={
		<PrivateRoute requireNoAuth={true} redirectTo="/">
			<Login />
		</PrivateRoute>
	} />
	
	<Route path="*" element={<Error />} />
</Routes>

export default AppRoutes