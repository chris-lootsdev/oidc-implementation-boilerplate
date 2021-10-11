import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';

const domNode = document.querySelector('App');

ReactDOM.render(
	<Router>
		<div className='default'>
			<App />
		</div>
	</Router>,
	domNode,
);
