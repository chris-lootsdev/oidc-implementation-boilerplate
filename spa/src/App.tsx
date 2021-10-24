import React, { createContext } from 'react';
import { Switch, Route } from 'react-router-dom';
import Layout from './components/layout/layout';
import Home from './views/home';
import Login from './views/login';
import AccessDenied from './views/access-denied';
import NotFound from './views/not-found';
import { appSettings } from './AppConfig';

export const ConfigContext = createContext(undefined);

const App = () => {
	return (
		<ConfigContext.Provider value={appSettings}>
			<Layout>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/interaction/:uid' component={Login} />
					<Route exact path='/oidctoken' component={Login} />
					<Route path='/access-denied' component={AccessDenied}></Route>
					<Route component={NotFound}></Route>
				</Switch>
			</Layout>
		</ConfigContext.Provider>
	);
};

export default App;
