import { Reducer, useEffect, useReducer } from 'react';

export default () => {
	const initialState = {
		innerHeight: window.innerHeight,
		innerWidth: window.innerWidth,
		showPassword: false,
	};

	const reducer: Reducer<any, any> = (state, action) => {
		switch (action.type) {
			case 'windowChange':
				return {
					...state,
					innerHeight: action.height,
					innerWidth: action.width,
				};
			case 'togglePassword':
				return { ...state, showPassword: !state.showPassword };
			default:
				throw new Error();
		}
	};

	const [{ innerHeight, innerWidth, showPassword }, dispatch] = useReducer(
		reducer,
		initialState,
	);

	useEffect(() => {
		window.onresize = () => {
			dispatch({
				type: 'windowChange',
				height: window.innerHeight,
				width: window.innerWidth,
			});
		};
	}, []);

	// instead of exposing dispatch, expose functions that do the work for us
	const togglePassword = () => {
		dispatch({
			type: 'togglePassword',
		});
	};

	return {
		innerHeight,
		innerWidth,
		showPassword,
		togglePassword,
	};
};
