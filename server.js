const express = require('express')
const compression = require('compression')
const path = require('path')

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { StaticRouter, match, RouterContext } from 'react-router'
import Error from './src/components/Error'
import Routes from './src/components/Routes'

const config = require('./config.json')

var app = express()

app.use(express.static(path.resolve(__dirname, 'public')))

app.set('view engine', 'ejs')
app.set('views', path.join(__dirname, 'views'))

app.use(compression({
	filter: (req, res) => {
		return compression.filter(req, res)
	}
}))

app.get('*', (req, res) => {
	res.setHeader('Content-Type', 'text/html; charset=utf-8')
	res.setHeader('Cache-Control', 'no-cache')
	
	let context = {}
	
	const markup = ReactDOMServer.renderToString(
		<StaticRouter location={req.url} context={context}>
			<Routes />
		</StaticRouter>
	)
	
	return res.render('template', { markup })
})

app.listen(config.port, err => {
	if (err) console.log(err)
	
	console.log('Server started on', '127.0.0.1:' + config.port)
})