import React from 'react'
import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import { createBrowserHistory } from 'history'

import { createStore } from './store'

import Root from './components/Root'

const history = createBrowserHistory()
const store = createStore(
	typeof window !== 'undefined' && (window.__INITIAL_STATE__ || {})
)

hydrateRoot(
	document,
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter history={history}>
				<Root assets={window.assetManifest} />
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
)