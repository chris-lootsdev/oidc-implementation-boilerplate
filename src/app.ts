import express from 'express';
import { config } from './config';
import { Provider } from 'oidc-provider';
import { configuration } from './oidc/oidc-config';
import oidcRoutes from './oidc/oidc-routes';
import initMiddleware from './middleware';
import path from 'path';
import fs from 'fs';
import https from 'https';

const { dnsEntry, keyPath, certPath } = config;

const oidc = new Provider(dnsEntry, {
	...configuration,
});
oidc.proxy = true;

const app = express();

initMiddleware(app, oidc);

// setup login routes for OIDC
oidcRoutes(app, oidc);

const options = {
	key: fs.readFileSync(keyPath),
	cert: fs.readFileSync(certPath),
};

// register public dir for serving
console.log(path.join(__dirname, 'public'));
app.use(express.static(path.join(__dirname, 'public')));

https.createServer(options, app).listen(app.get('port'), () => {
	console.log(`server is running on port ${app.get('port')}`);
});
