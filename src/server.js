import React from 'react'
import { renderToPipeableStream } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

import Root from './components/Root'

import { setAuthStatus } from './actions/user'
import { createStore } from './store'
import config from '../config'

const assets = {
	bundle: '/assets/js/bundle.js',
	css: '/assets/css/build.min.css'
}

const ServerSideRender = (req, res) => {
	req.app.get('env') === 'development' && res.setHeader('Cache-Control', 'no-cache')
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	
	const context = {}
	const store = createStore()
	
	const userId = req.session && req.session.userId
	
	store.dispatch(setAuthStatus(typeof userId !== 'undefined'))
	
	let didError = false
	
	const stream = renderToPipeableStream(
		<React.StrictMode>
			<Provider store={store}>
				<StaticRouter location={req.url} context={context}>
					<Root assets={assets} />
				</StaticRouter>
			</Provider>
		</React.StrictMode>,
		{
			bootstrapScripts: [ assets.bundle ],
			onShellReady() {
				// The content above all Suspense boundaries is ready.
				// If something errored before we started streaming, we set the error code appropriately.
				res.statusCode = didError ? 500 : 200
				stream.pipe(res)
			},
			onShellError() {
				// Something errored before we could complete the shell so we emit an alternative shell.
				console.log('shell err')
				if (context.status) res.status(context.status)
				
				const initialState = JSON.stringify(store.getState())
				
				res.statusCode = 500
				res.render('template', {
					keys: config.keys,
					meta: config.meta,
					initialState
				})
			},
			onError(err) {
				console.log('on err')
				didError = true;
				console.error(err);
			},
		}
	)
}

export default ServerSideRender