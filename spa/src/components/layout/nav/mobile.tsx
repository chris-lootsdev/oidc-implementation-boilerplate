import React from 'react';
import Menu from '@mui/material/Menu';
import menuItemsHook, { MenuItemInterface } from './menu-items-hook';
import MuiMenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';

interface MobileNavProps {
	mobileMoreAnchorEl: null | HTMLElement;
	setMobileMoreAnchorEl: any;
	mobileMenuId: string;
}

const MobileActions = () => {
	const { handleMenuItemClick, menuItems } = menuItemsHook();

	return (
		<>
			{menuItems.map((item: MenuItemInterface, index: number) => (
				<MuiMenuItem
					disabled={item.disabled}
					onClick={() => handleMenuItemClick(index)}
					key={index}
				>
					<IconButton size='large' color='inherit'>
						{item.icon}
					</IconButton>
					<p>{item.title}</p>
				</MuiMenuItem>
			))}
		</>
	);
};

export default ({
	mobileMoreAnchorEl,
	setMobileMoreAnchorEl,
	mobileMenuId,
}: MobileNavProps) => {
	const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

	const handleMobileMenuClose = () => {
		setMobileMoreAnchorEl(null);
	};

	return (
		<Menu
			anchorEl={mobileMoreAnchorEl}
			anchorOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			id={mobileMenuId}
			keepMounted
			transformOrigin={{
				vertical: 'top',
				horizontal: 'right',
			}}
			open={isMobileMenuOpen}
			onClose={handleMobileMenuClose}
		>
			<MobileActions />
		</Menu>
	);
};
