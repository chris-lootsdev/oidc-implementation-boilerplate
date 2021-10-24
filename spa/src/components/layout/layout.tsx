import React from 'react';
import Box from '@material-ui/core/Box';
import Container from '@material-ui/core/Container';
import Nav from './nav/main';

export default (props: { children: any }) => {
	const { children } = props;

	return (
		<>
			<Nav />
			<Box my={4}>
				<Container maxWidth='xl'>
					<main>{children}</main>
				</Container>
			</Box>
		</>
	);
};
