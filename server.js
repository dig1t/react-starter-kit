import express from 'express'
import session from 'express-session'
import path from 'path'
import compression from 'compression'
import helmet from 'helmet'
import mongoose from 'mongoose'
import MongoStore from 'connect-mongo'
import sanitize from 'mongo-sanitize'
import passport from 'passport'
import { Strategy as LocalStrategy } from 'passport-local'

import config from './config.js'
import api from './api.js'

import User from './src/models/User.js'

/* Server-side Rendering Components */
import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter } from 'react-router-dom/server'
import { Provider } from 'react-redux'

//import Error from './src/components/Routes/Error'
//import Routes from './src/components/Routes'
import Root from './src/components/Root'

import { setAuthStatus } from './src/actions/user'
import { configureStore } from './src/store'

const app = express()

/* Setup mongoose */
const db = mongoose.connection

mongoose.connect(config.db, { useNewUrlParser: true })
mongoose.Promise = global.Promise

db.on('error', console.error.bind(console, 'mongodb error:'))
db.once('open', () => {
	console.log('mongodb connection established')
})

/* Setup express */
app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.resolve(__dirname, 'public')))
app.use(compression())
app.use(helmet({ noCache: app.get('env') === 'development' }))
app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.on('error', err => {
	if (err) console.error(err)
	
	//console.log(`Server started on port ${config.port}`)
})

/* Setup express-session */
const expressSessionData = {
	name: '_sid',
	secret: config.expressSecret,
	cookie: {
		expires: new Date().setMonth(new Date().getMonth() + 18)
	},
	resave: true,
	saveUninitialized: true,
	store: MongoStore.create({ client: mongoose.connection.getClient() })
}

if (app.get('env') === 'production') {
	app.set('trust proxy', 1) // trust first proxy
	expressSessionData.cookie.secure = true // serve secure cookies
}

app.use(session(expressSessionData))

/* Setup passport.js */
app.use(passport.initialize())
app.use(passport.session()) // must be run after express-session

passport.use('local', new LocalStrategy(
	{usernameField: 'email'},
	async (email, password, done) => {
		try {
			User.findOne({email: sanitize(email)})
				.then(async user => {
					if (!user || !await user.validPassword(password)) {
						return done(null, false, 'Please try another email or password')
					}
					
					done(null, user)
				})
				.catch(e => done(e))
		} catch(e) {
			done(e)
		}
	}
))

passport.serializeUser((user, done) => done(null, user._id))

passport.deserializeUser((id, done) => {
	User.findById(id)
		.then(user => done(null, user))
		.catch(err => done(err))
})

/* PWA config */
app.get('/manifest.json', (req, res) => {
	return res.send({
		name: config.meta.title,
		short_name: config.name,
		description: config.meta.description,
		start_url: '/login',
		display: 'standalone',
		orientation: 'portrait',
		theme_color: config.theme_color,
		background_color: '#ffffff'
	})
})

/* Hook authentication routes */
app.post('/login', (req, res, next) => {
	passport.authenticate('local', function(err, user, message) {
		if (err) {
			return next(err)
		} else if (!user) {
			// user not authenticated
			return res.send({ success: false, message })
		}
		
		// user authenticated, establish session with req.logIn()
		req.logIn(user, err => {
			if (err) return next(err)
			
			const { userId, isAdmin, isMod } = user
			
			req.session.userId = userId
			req.session.isAdmin = isAdmin
			req.session.isMod = isMod
			
			return res.send({ success: true })
		})
	})(req, res, next)
})

app.get('/logout', (req, res, next) => {
	req.logout()
	req.session.destroy()
	res.redirect('/')
})

/* Hook API routes */
api(app)

/* Route all other traffic to React Renderer */
app.get('*', (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	app.get('env') === 'development' && res.setHeader('Cache-Control', 'no-cache')
	
	const context = {}
	const store = configureStore()
	
	//store.dispatch(setAuthStatus(typeof req.session.userId !== 'undefined'))
	
	let markup = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<Provider store={store}>
				<Root />
			</Provider>
		</StaticRouter>
	)
	
	if (context.status) res.status(context.status)
	
	return res.render('template', {
		keys: config.keys,
		meta: config.meta,
		initialState: JSON.stringify(store.getState()),
		markup
	})
})

app.listen(config.port)

export default app