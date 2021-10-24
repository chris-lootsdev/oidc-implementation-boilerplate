import React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import MoreIcon from '@mui/icons-material/MoreVert';
import menuItemsHook, { MenuItemInterface } from './menu-items-hook';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';

interface DesktopNav {
	mobileMenuId: string;
	handleMobileMenuOpen: any;
}

const DesktopActions = () => {
	const { handleMenuItemClick, menuItems } = menuItemsHook();

	return (
		<>
			{menuItems.map((item: MenuItemInterface, index: number) => {
				return (
					<Button
						key={index}
						onClick={() => handleMenuItemClick(index)}
						variant='outlined'
						style={{ color: 'white' }}
						disabled={item.disabled}
						startIcon={item.icon}
					>
						{item.title}
					</Button>
				);
			})}
		</>
	);
};

export default ({ mobileMenuId, handleMobileMenuOpen }: DesktopNav) => {
	return (
		<AppBar position='static'>
			<Toolbar>
				<Typography
					variant='h6'
					noWrap
					component='div'
					sx={{ display: { xs: 'none', sm: 'block' } }}
				>
					OIDC Admin
				</Typography>
				<Box sx={{ flexGrow: 1 }} />
				<Box sx={{ display: { xs: 'none', md: 'flex' } }}>
					<DesktopActions />
				</Box>
				<Box sx={{ display: { xs: 'flex', md: 'none' } }}>
					<IconButton
						size='large'
						aria-label='show more'
						aria-controls={mobileMenuId}
						aria-haspopup='true'
						onClick={handleMobileMenuOpen}
						color='inherit'
					>
						<MoreIcon />
					</IconButton>
				</Box>
			</Toolbar>
		</AppBar>
	);
};
