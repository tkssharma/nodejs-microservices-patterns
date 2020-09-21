import React from 'react';
let AuthLayout = (props) => {

	let backgroundChoices = ['bg1', 'bg4', 'bg3', 'bg4', 'bg5'];

	let background_image;
	delete localStorage.auth_background;
	if (!localStorage.auth_background) {
		background_image = backgroundChoices[Math.floor(Math.random() * backgroundChoices.length)];
		localStorage.auth_background = background_image;
	} else {
		background_image = localStorage.auth_background;
	}

	return (
			<div className={`auth-container ${background_image}`}>
				{props.children}
			</div>
	)

}

export default AuthLayout;
