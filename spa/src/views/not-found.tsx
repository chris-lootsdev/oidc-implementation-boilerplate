import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export default () => {
	return (
		<Alert severity="warning">
        	<AlertTitle>404 - Not Found</AlertTitle>
        	The page you are looking for does not exist :(
      	</Alert>
	);
}
