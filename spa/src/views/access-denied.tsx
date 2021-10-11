import React from 'react';
import { Alert, AlertTitle } from '@material-ui/lab';

export default () => {
	return (
		<Alert severity="error">
			<AlertTitle>401 - Unauthorized</AlertTitle>
			You don't have the permissions to access this page.
		</Alert>
	);
};
