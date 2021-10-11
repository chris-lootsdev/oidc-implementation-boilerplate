import React from 'react';
import { InputAdornment } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { TextField } from 'mui-rff';
import Button from '@mui/material/Button';
import useFormHook from './form-hook';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import IconButton from '@mui/material/IconButton';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { styled } from '@mui/material/styles';
import AdfsAnchor from './adfs-anchor';
import { getComposedValidators } from '../../validators';

const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
	<Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
	[`& .${tooltipClasses.tooltip}`]: {
		backgroundColor: '#ffffff',
		color: '#bbb',
		width: 250,
		fontSize: theme.typography.pxToRem(12),
		border: '1px solid #dadde9',
	},
}));

export default ({ submitting, submitError }) => {
	const { showPassword, togglePassword } = useFormHook();

	return (
		<>
			<TextField
				fieldProps={{
					validate: getComposedValidators({
						isRequired: true,
						validators: [],
					}),
				}}
				variant='outlined'
				name='userID'
				autoComplete='username'
				label='Username'
				required={true}
			/>
			<TextField
				fieldProps={{
					validate: getComposedValidators({
						isRequired: true,
						validators: [],
					}),
				}}
				variant='outlined'
				autoComplete='password'
				required={true}
				label='Password'
				type={showPassword ? 'text' : 'password'}
				name='password'
				InputProps={{
					endAdornment: (
						<InputAdornment position='end'>
							<IconButton
								aria-label='toggle password visibility'
								onClick={togglePassword}
							>
								{showPassword ? <Visibility /> : <VisibilityOff />}
							</IconButton>
						</InputAdornment>
					),
				}}
			/>

			{submitError && (
				<div className='error'>
					{submitError}{' '}
					<HtmlTooltip
						placement='top-end'
						title={
							<>
								<div
									style={{
										display: 'flex',
										justifyContent: 'space-between',
										alignContent: 'center',
									}}
								>
									<div style={{ maxWidth: '60%' }}>ITT employee?</div>
									<div>
										<AdfsAnchor />
									</div>
								</div>
							</>
						}
					>
						<IconButton aria-label='info'>
							<InfoOutlinedIcon />
						</IconButton>
					</HtmlTooltip>
				</div>
			)}
			<Button
				fullWidth
				variant='contained'
				style={{ backgroundColor: '#5F9EA0', color: '#FFFFFF' }}
				disabled={submitting}
				type='submit'
			>
				Let's Go!
			</Button>
		</>
	);
};
