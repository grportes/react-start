#!/bin/bash
NOW=$(date +"app_%d-%m-%Y-%T")
PASTA=${NOW//:/-}
PASTA=${PASTA//-/_}
mkdir $PASTA
cd $PASTA
yarn init

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

echo "-----------------------------------"
echo "Adicionando scripts em package.json"
echo "-----------------------------------"
sed '6 i\  "scripts": {\n    "build": "webpack",\n    "start:dev": "webpack-dev-server"\n  },' package.json > newpackage.json
mv newpackage.json package.json

echo "---------------------------------"
echo "CRIANDO .babelrc"
echo "---------------------------------"
cat > .babelrc <<EOL
{
	"presets": [
		"@babel/env",
		"@babel/react"
	]
}
EOL

echo "---------------------------------"
echo "CRIANDO webpack.config.js"
echo "---------------------------------"
cat > webpack.config.js <<EOL
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
};
EOL

echo "---------------------------------"
echo "CRIANDO FOLDER src"
echo "---------------------------------"
mkdir src

echo "---------------------------------"
echo "CRIANDO src/index.html"
echo "---------------------------------"
cat > src/index.html <<EOL
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
EOL

echo "---------------------------------"
echo "CRIANDO src/index.css"
echo "---------------------------------"
cat > src/index.css <<EOL
body
{
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #E4E4E4;
}
EOL

echo "---------------------------------"
echo "CRIANDO src/index.js"
echo "---------------------------------"
cat > src/index.js <<EOL
import React from 'react';
import ReactDOM from 'react-dom';

import App from './components/App';

ReactDOM.render(<App /> ,document.getElementById('app'));
EOL

echo "---------------------------------"
echo "CRIANDO FOLDER src/components"
echo "---------------------------------"
mkdir src/components

echo "---------------------------------"
echo "CRIANDO FOLDER src/components/App"
echo "---------------------------------"
mkdir src/components/App
cat > src/components/App/index.js <<EOL
import React from 'react';
import {Fragment} from 'react';
import {createMuiTheme} from '@material-ui/core';
import {MuiThemeProvider} from '@material-ui/core';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import green from '@material-ui/core/colors/green';
import purple from '@material-ui/core/colors/purple';
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Switch} from 'react-router-dom';
import 'typeface-roboto';

import './App.css';
import store from '../../store';
import Home from '../Home'

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

class App extends React.Component {

    render() {

        return (
            <Provider store={store}>

                <MuiThemeProvider theme={theme}>

                    <BrowserRouter>

                        <Fragment>

                            <AppBar position="static" color="primary">
                                <Toolbar>
                                    <Typography variant='h6'>
                                        Agenda
                                    </Typography>
                                </Toolbar>
                            </AppBar>

                            <Switch>
                                <Route exact path='/' component={Home} />
                            </Switch>

                        </Fragment>

                    </BrowserRouter>

                </MuiThemeProvider>

            </Provider>
        );
    }
}

export default App;
EOL

cat > src/components/App/App.css <<EOL
body
{
    margin: 0;
    padding: 0;
    font-family: 'Roboto', sans-serif;
    background-color: #E4E4E4;
}
EOL

echo "---------------------------------"
echo "CRIANDO FOLDER src/components/Home"
echo "---------------------------------"
mkdir src/components/Home
cat > src/components/Home/index.js <<EOL
import React from 'react';

const Home = () => (<h1>HOme</h1>);

export default Home;
EOL

echo "---------------------------------"
echo "CRIANDO FOLDER src/store"
echo "---------------------------------"
mkdir src/store
mkdir src/store/actions
mkdir src/store/reducers
mkdir src/store/sagas

cat > src/store/index.js <<EOL
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
EOL


echo "---------------------------------------"
echo "FIM - Projeto configurado com WebPack 4"
echo "cd $PASTA"
echo "yarn run start:dev"
echo "---------------------------------------"

