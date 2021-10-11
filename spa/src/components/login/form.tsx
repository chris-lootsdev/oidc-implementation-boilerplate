import React from 'react';
import FormActions from './form-fields';
import openImg from '../../assets/rect-light.svg';
import useFormHook from './form-hook';
import AdfsAnchor from './adfs-anchor';

export default (props) => {
	const { submitting, handleSubmit, submitError } = props;
	const { innerHeight, innerWidth } = useFormHook();

	return (
		<form
			onSubmit={(event) => {
				handleSubmit(event);
			}}
			noValidate={true}
			autoComplete='off'
		>
			<img
				style={{ position: 'absolute', top: 0, left: 0, height: '100vh', width: '100%' }}
				src={openImg}
			/>
			<div
				style={{
					position: 'absolute',
					left: innerWidth / 2,
					top: innerHeight / 2,
				}}
				className='focus-component'
			>
				<div className='wrapper'>
					<h1
						style={{ textAlign: 'center', marginTop: 'unset' }}
						className='thin'
					>
						Log in.
					</h1>
					<div className='titles'>
						<div className='title'>
							<div className='thin info heavy'>Channel Partners!</div>
						</div>
						<div className='title'>
							<AdfsAnchor />
						</div>
					</div>
					<div className='options'>
						<div className='option space-vertical'>
							<FormActions submitError={submitError} submitting={submitting} />
						</div>
						<div className='option left-right'>
							<a>Forgot password?</a>
							<a>Sign up now...</a>
						</div>
					</div>
				</div>
			</div>
		</form>
	);
};
