import React from 'react';
import Box from '@mui/material/Box';
import MobileNav from './mobile';
import DesktopNav from './desktop';

export default () => {
	const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
		React.useState<null | HTMLElement>(null);

	const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
		setMobileMoreAnchorEl(event.currentTarget);
	};

	const mobileMenuId = 'primary-search-account-menu-mobile';

	return (
		<Box sx={{ flexGrow: 1 }}>
			<DesktopNav
				mobileMenuId={mobileMenuId}
				handleMobileMenuOpen={handleMobileMenuOpen}
			/>
			{
				<MobileNav
					mobileMoreAnchorEl={mobileMoreAnchorEl}
					setMobileMoreAnchorEl={setMobileMoreAnchorEl}
					mobileMenuId={mobileMenuId}
				/>
			}
		</Box>
	);
};
