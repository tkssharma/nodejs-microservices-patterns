import React from 'react';
import {connect} from 'react-redux';
import * as Action from './action';
import {Link, hashHistory} from 'react-router';
import {message, Spin} from 'antd';

import * as API from '../../api'
import Auth from '../../util/middleware/auth';
import axios from 'axios';
import jwt from 'jsonwebtoken';

const mapStateToProps = (state, ownProps) => {
	return {query: ownProps.location.query}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		authUpdateUserData: (data) => dispatch(Action.authUpdateUserData(data))
	}
}

let ValidateTokenPage = (props) => {

	const access_token = props.query.token;
	console.log(access_token);
	if (access_token) {
		API.setAuthToken(access_token);
		axios
		.get(API.url('validate_auth'))
		.then((response) => {
			if (response.data.statusCode === 200 && response.data.success === true) {
				message.success('Successfully logged in.', 3);
				Auth.setAccessToken(access_token);
				const userToken = jwt.decode(access_token);
				props.authUpdateUserData(userToken);

				if(userToken.type === '1'){
				//	hashHistory.push(routes.user_dashboard);
				} else {
				//	hashHistory.push(routes.vendor_dashboard);
				}


			} else {
				message.error('Invalid auth token, please try logging in again', 3);
				Auth.deleteAccessToken();
				API.setAuthToken();
				hashHistory.push('/auth/login');
			}
		})
		.catch((response) => {
			console.log('catch error', response);
		});

	}

	const ui_logo = (
	     	<Link to="/"><img src="images/logo.png" className="auth-logo" alt=""/></Link>
	);

	const ui_no_access_token = (
		<div className="content">
		<h1>Access token not present</h1>
		<Link
		to="/auth/login"
		className="button default inline m-t-20 label-marker">Try logging in again &rarr;</Link>
		</div>
	);

	const ui_verifying = (
		<div className="content">
		<h4>Verifying your account, Please wait...</h4>
		<div className="m-t-20 center">
		<Spin size="large"/>
		</div>
		</div>
	);

	return (
		<div>
			<div className="scooty-head">
			{ui_logo}
			{access_token
				? ui_verifying
				: ui_no_access_token}
			</div>
		</div>
		)

	}

	const ConnectValidateTokenPage = connect(mapStateToProps, mapDispatchToProps)(ValidateTokenPage)

	export default ConnectValidateTokenPage;
