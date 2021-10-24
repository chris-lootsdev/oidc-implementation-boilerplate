import React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import _ from 'lodash';

const Row = (props: { row: ReturnType<any> }) => {
	const { row } = props;
	const [open, setOpen] = React.useState(false);

	return (
		<>
			<TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
				<TableCell>
					<IconButton
						aria-label='expand row'
						size='small'
						onClick={() => setOpen(!open)}
					>
						{open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
					</IconButton>
				</TableCell>
				{_.map(row.headlines, (name, index) => {
					return (
						<TableCell key={index} align='right'>
							{name}
						</TableCell>
					);
				})}
			</TableRow>
			<TableRow>
				<TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
					<Collapse in={open} timeout='auto' unmountOnExit>
						<Box sx={{ margin: 1 }}>
							<Typography variant='h6' gutterBottom component='div'>
								Details
							</Typography>
							<List
								sx={{
									width: '100%',
									maxWidth: 360,
									bgcolor: 'background.paper',
								}}
							>
								{_.map(_.toPairs(row.details), (pair, index) => {
									return (
										<>
											<ListItem key={index}>
												<ListItemText
													primary={_.first(pair)}
													secondary={_.last(pair)}
												/>
											</ListItem>
											<Divider />
										</>
									);
								})}
							</List>
						</Box>
					</Collapse>
				</TableCell>
			</TableRow>
		</>
	);
};

export default (props: { rows: any[]; stickyColumnNames: string[] }) => {
	const { rows, stickyColumnNames } = props;

	return (
		<TableContainer style={{ overflow: 'auto' }} component={Paper}>
			<Table aria-label='collapsible table'>
				<TableHead>
					<TableRow>
						<TableCell />
						{_.map(stickyColumnNames, (name, index) => {
							return (
								<TableCell key={index} align='right'>
									{name}
								</TableCell>
							);
						})}
					</TableRow>
				</TableHead>
				<TableBody>
					{_.map(rows, (row, index) => {
						debugger;
						return <Row key={index} row={row} />;
					})}
				</TableBody>
			</Table>
		</TableContainer>
	);
};
