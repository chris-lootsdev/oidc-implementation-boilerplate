import React, { Reducer, useReducer } from 'react';
import PersonIcon from '@mui/icons-material/Person';
import LockIcon from '@mui/icons-material/EnhancedEncryption';
import FingerprintIcon from '@mui/icons-material/Fingerprint';

export interface MenuItemInterface {
	// any svg icon
	icon: any;

	//  display text of the menu item
	title: string;

	// means the menu item has been clicked
	disabled: boolean;
}

export default () => {
	const initialState: MenuItemInterface[] = [
		{ icon: <PersonIcon />, title: 'Clients', disabled: false },
		{ icon: <LockIcon />, title: 'JWK Keys', disabled: false },
		{ icon: <FingerprintIcon />, title: 'Claims', disabled: false },
	];

	const reducer: Reducer<any, any> = (state, action) => {
		switch (action.type) {
			case 'clicked':
				const { index } = action;

				// do nothing if current clicked is disabled
				if (state[index].disabled === true) return [...state];

				const immutableCopyMenuItems = [...state];

				// set all disabled to false
				immutableCopyMenuItems.forEach((f) => (f.disabled = false));

				// set current selected to disabled
				immutableCopyMenuItems[index].disabled = true;

				return [...immutableCopyMenuItems];
			default:
				throw new Error('Unhandled Switch Expression');
		}
	};

	const [menuItems, dispatch] = useReducer(reducer, initialState);
	const handleMenuItemClick = (index) => {
		dispatch({ type: 'clicked', index });
	};

	return {
		handleMenuItemClick,
		menuItems,
	};
};
