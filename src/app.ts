import express from 'express';
import { Provider } from 'oidc-provider';
import { configuration } from './oidc/oidc-config';
import oidcRoutes from './oidc/oidc-routes';
import initMiddleware from './middleware';
import path from 'path';
import fs from 'fs';
import https from 'https';

const oidc = new Provider('https://dev.local.com', {
	...configuration,
});
oidc.proxy = true;

const app = express();

initMiddleware(app, oidc);

// setup login routes for OIDC
oidcRoutes(app, oidc);

const options = {
	key: fs.readFileSync(
		'/Users/chris/.certs/_wildcard.local.com-key.pem',
	),
	cert: fs.readFileSync(
		'/Users/chris/.certs/_wildcard.local.com.pem',
	),
};

// register public dir for serving
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

https.createServer(options, app).listen(app.get('port'), () => {
	console.log(`server is running on port ${app.get('port')}`);
});

// if not found resolve to SPA
// app.use((_, res) => {
// 	debugger;
// 	res.sendFile(path.join(__dirname, 'public/index.html'));
// });
