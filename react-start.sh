#!/bin/bash

baixar_dependencias() 
{
	echo "-------------------------------------------------------"
	echo "Adicionando dependencias"
	echo "-------------------------------------------------------"
	yarn add react 
	yarn add react-dom 
	yarn add @material-ui/core 
	yarn add @material-ui/icons
	yarn add typeface-roboto
	yarn add redux
	yarn add react-redux
	yarn add react-router
	yarn add react-router-dom
	yarn add classnames

	echo "-------------------------------------------------------"
	echo "Adicionando dependencias p/ desenvolvimento"
	echo "-------------------------------------------------------"
	yarn add -D webpack 
	yarn add -D webpack-cli 
	yarn add -D webpack-dev-server 
	yarn add -D html-webpack-plugin 
	yarn add -D clean-webpack-plugin
	yarn add -D style-loader 
	yarn add -D css-loader 
	yarn add -D file-loader 
	yarn add -D babel-loader 
	yarn add -D @babel/core 
	yarn add -D @babel/preset-env
	yarn add -D @babel/preset-react
	yarn add -D @babel/plugin-proposal-class-properties
	yarn add -D @babel/plugin-transform-class-properties

}

config_package_json()
{
	echo "-----------------------------------"
	echo "Adicionando scripts em package.json"
	echo "-----------------------------------"
	sed '6 i\  "scripts": {\n    "build": "webpack",\n    "start:dev": "webpack-dev-server"\n  },' package.json > newpackage.json
	mv newpackage.json package.json
}

criar_arquivo_babelrc()
{
	echo "---------------------------------"
	echo "CRIANDO .babelrc"
	echo "---------------------------------"
	babelrc='
	{
		"presets": [
			"@babel/env",
			"@babel/react"
		],
		"plugins": [
			"@babel/plugin-proposal-class-properties"
		]
	}'
	echo "$babelrc" > .babelrc
}

config_webpack()
{

	echo "---------------------------------"
	echo "CRIANDO webpack.config.js"
	echo "---------------------------------"
	webpack="
	const path = require('path');
	const HtmlWebpackPlugin = require('html-webpack-plugin');
	const CleanWebpackPlugin = require('clean-webpack-plugin');

	module.exports = {

		mode: 'development',

		output: {
			path: path.resolve(__dirname, 'dist'),
			filename: 'index_bundle.js',
			publicPath: '/'
		}, 

		devtool: 'inline-source-map',

		devServer: {
			index: 'index.html',
			contentBase: './dist',
			historyApiFallback: true,
		 	inline: true,
			open: true,
			port: 8080
		},	

		plugins: [
			new CleanWebpackPlugin(['dist']),
			new HtmlWebpackPlugin({
				title: 'Teste',
				template: './src/index.html',
				filename: './index.html'
			})
		],

		module: {
			rules: [
				{
					test: /\.css$/,
					use: [ 'style-loader', 'css-loader' ]
				},
				{
					test: /\.(png|svg|jpg|gif)$/,
					use: [ 'file-loader' ]
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					use: [ 'file-loader' ]
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: [ 'babel-loader']
				}
			]
		}
	};"
	echo "$webpack" > webpack.config.js

}


criar_folder_src()
{
	echo "---------------------------------"
	echo "CRIANDO FOLDER src"
	echo "---------------------------------"
	mkdir src

	echo "---------------------------------"
	echo "CRIANDO src/index.html"
	echo "---------------------------------"
	tmp='
	<!DOCTYPE html>
	<html lang="pt-br">
		<head>
			<meta charset="UTF-8">
		  	<meta name="viewport" content="width=device-width, initial-scale=1.0">
			<meta http-equiv="X-UA-Compatible" content="ie=edge">
			<title>TESTE</title>
		</head>
		<body>
			<div id='app'></div>
		</body>
	</html>
	'
	echo "$tmp" > src/index.html

	echo "---------------------------------"
	echo "CRIANDO src/index.css"
	echo "---------------------------------"
	tmp="
	body
	{
		 margin: 0;
		 padding: 0;
		 font-family: 'Roboto', sans-serif;
		 background-color: #E4E4E4;
	}
	"
	echo "$tmp" > src/index.css

	echo "---------------------------------"
	echo "CRIANDO src/index.js"
	echo "---------------------------------"
	tmp="
	import React from 'react';
	import ReactDOM from 'react-dom';

	import App from './components/App';

	ReactDOM.render(<App /> ,document.getElementById('app'));
	"
	echo "$tmp" > src/index.js

	echo "---------------------------------"
	echo "CRIANDO FOLDER src/components"
	echo "---------------------------------"
	mkdir src/components

	echo "---------------------------------"
	echo "CRIANDO FOLDER src/components/App"
	echo "---------------------------------"
	mkdir src/components/App
	tmp="
	import React from 'react';
	import {Component} from 'react';
	import {Fragment} from 'react';
	import {createMuiTheme} from '@material-ui/core';
	import {MuiThemeProvider} from '@material-ui/core';
	import green from '@material-ui/core/colors/green';
	import purple from '@material-ui/core/colors/purple';
	import {Provider} from 'react-redux';
	import {BrowserRouter} from 'react-router-dom';
	import {Route} from 'react-router-dom';
	import {Switch} from 'react-router-dom';
	import 'typeface-roboto';

	import './App.css';
	import store from '../../store';
	import routes from '../../routes';
	import Header from '../Header';

	const theme = createMuiTheme({
		 palette: {
		     primary: green,
		     secondary: purple,
		 },
		 status: {
		     danger: 'orange',
		 },
		 typography: {
		     useNextVariants: true,
		 }
	});

	class App extends Component {

		 render() {

		     return (
		         <Provider store={store}>

		             <MuiThemeProvider theme={theme}>

		                 <BrowserRouter>

		                     <Fragment>

		                         <Header/>

		                         <Switch>
		                             {
		                                 routes.map((route,index) => (
		                                     <Route
		                                         key={index}
		                                         path={route.path}
		                                         exact={route.exact}
		                                         component={route.component}
		                                     />
		                                 ))
		                             }
		                         </Switch>

		                     </Fragment>

		                 </BrowserRouter>

		             </MuiThemeProvider>

		         </Provider>
		     );
		 }
	}
	"
	echo "$tmp" > src/components/App/index.js

	tmp="
	body
	{
		 margin: 0;
		 padding: 0;
		 font-family: 'Roboto', sans-serif;
		 background-color: #E4E4E4;
	}
	"
	echo "$tmp" > src/components/App/App.css

	echo "---------------------------------"
	echo "CRIANDO FOLDER src/components/Header"
	echo "---------------------------------"
	mkdir src/components/Header
	tmp="
	import React from 'react';
	import AppBar from '@material-ui/core/AppBar';
	import Toolbar from '@material-ui/core/Toolbar';
	import Typography from '@material-ui/core/Typography';
	import IconButton from '@material-ui/core/IconButton';
	import MenuIcon from '@material-ui/icons/Menu';

	const Header = () => (
		 <AppBar position='static' color='primary'>
		     <Toolbar>
		         <IconButton className='app-menu' color='inherit' aria-label='Menu'>
		             <MenuIcon />
		         </IconButton>
		         <Typography variant='h6'>
		             Agenda
		         </Typography>
		     </Toolbar>
		 </AppBar>
	);

	export default Header;
	"
	echo "$tmp" > src/components/Header/index.js

	echo "---------------------------------"
	echo "CRIANDO FOLDER src/components/Home"
	echo "---------------------------------"
	mkdir src/components/Home
	tmp="
	import React from 'react';

	const Home = () => (<h1>HOme</h1>);

	export default Home;
	"
	echo "$tmp" > src/components/Home/index.js
	

	echo "---------------------------------"
	echo "CRIANDO FOLDER src/components/Sobre"
	echo "---------------------------------"
	mkdir src/components/Sobre
	tmp="
	import React from 'react';

	const Sobre = () => (<h1>App exemplo</h1>);

	export default Sobre;
	"
	echo "$tmp" > src/components/Sobre/index.js


	echo "---------------------------------"
	echo "CRIANDO FOLDER src/routes"
	echo "---------------------------------"
	mkdir src/routes
	tmp="
	import React from 'react';

	import Home from '../components/Home'
	import Sobre from '../components/Sobre';

	const routes = [

		 {
		     path: '/',
		     exact: true,
		     component: () => ( <Home/> )
		 },

		 {
		     path: '/sobre',
		     exact: true,
		     component: () => ( <Sobre/> )
		 },
	];

	export default routes;
	"
	echo "$tmp" > src/routes/index.js

	echo "---------------------------------"
	echo "CRIANDO FOLDER src/store"
	echo "---------------------------------"
	mkdir src/store
	mkdir src/store/actions
	mkdir src/store/reducers
	mkdir src/store/sagas

	tmp="
	import {createStore} from 'redux';

	import reducers from './reducers';

	const store = createStore(
		reducers,
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
	);

	export default store;
	EOL

	cat > src/store/reducers/index.js <<EOL
	import {combineReducers} from 'redux';

	export default combineReducers({
		root: () => ({})
	});
	"
	echo "$tmp" > src/store/index.js

}

init()
{

	NOW=$(date +"app_%d-%m-%Y-%T")
	PASTA=${NOW//:/-}
	PASTA=${PASTA//-/_}
	mkdir $PASTA
	cd $PASTA
	yarn init

	baixar_dependencias
	config_package_json
	criar_arquivo_babelrc
	config_webpack
	criar_folder_src

	echo "---------------------------------------"
	echo "FIM - Projeto configurado com WebPack 4"
	echo "cd $PASTA"
	echo "yarn run start:dev"
	echo "---------------------------------------"


}

init
