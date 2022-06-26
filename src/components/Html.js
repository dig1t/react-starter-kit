import React from 'react'

export default ({ children, assets }) => {
	return (
		<html>
			<head>
				<title>React App</title>
				<meta charSet="utf-8" />
				<meta name="mobile-web-app-capable" content="yes" />
				<meta name="viewport" content="width=device-width, minimum-scale=1.0" />
				<link rel="manifest" href="/manifest.json" />
				<link rel="icon" type="image/png" href="/assets/i/icon@16x16.png" sizes="16x16" />
				<link rel="icon" type="image/png" href="/assets/i/icon@32x32.png" sizes="32x32" />
				<link rel="icon" type="image/png" href="/assets/i/icon@96x96.png" sizes="96x96" />
				<link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="true" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
				<link rel="preconnect" href="https://use.fontawesome.com" crossOrigin="true" />
				<link rel="stylesheet" href={assets.css} />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Open+Sans:300,400,400i,600,700,700i,800" />
				<link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.8.1/css/all.css" integrity="sha384-50oBUHEmvpQ+1lW4y57PTFmhCaXp0ML5d60M1M7uH2+nqUivzIebhndOJK28anvf" crossOrigin="anonymous" />
				<meta name="theme-color" content="#000011" />
				<script src="//localhost:35729/livereload.js"></script>
			</head>
			<body>
				{children}
				<script dangerouslySetInnerHTML={{
					__html: `assetManifest=${JSON.stringify(assets)};`
				}} />
			</body>
		</html>
	)
}