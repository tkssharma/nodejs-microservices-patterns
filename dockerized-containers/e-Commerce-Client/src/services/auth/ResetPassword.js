import React from 'react';
import { connect } from 'react-redux';
import * as Action from './action';
import { Link } from 'react-router';
import { Spin, Alert, notification } from 'antd';
import InputHelper from '../../util/helper/index';
const mapStateToProps = (state, ownProps) => {
	return {
		login: state
			.auth
			.get('login'),
		reset_password: state
			.auth
			.get('reset_password')
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		authUpdateLoginFormField: (data) => dispatch(Action.authUpdateLoginFormField(data)),
		authSubmitResetPasswordForm: (data) => dispatch(Action.authSubmitResetPasswordForm(data)),
		authInvalidateResetPasswordForm: (data) => dispatch(Action.authInvalidateResetPasswordForm(data)),
		authServerResetPassword: (data) => dispatch(Action.authServerResetPassword(data))
	}
}

let ResetPasswordPage = (props) => {

	let user_email = props
		.login
		.get('email');

	let handleSubmit = (event) => {
		event.preventDefault();
		props.authSubmitResetPasswordForm(true);

		let errorHandler = (message, description) => {
			setTimeout(() => {
				props.authInvalidateResetPasswordForm(true);
				notification.error({ message: message, description: description });
				props.authSubmitResetPasswordForm(false);
			}, 50);
		}

		if (!user_email) {
			errorHandler('Error Occoured!', 'Please enter your email address.')
		} else if (!InputHelper.validateEmail(user_email)) {
			errorHandler('Invalid Email', 'Please enter a valid email address.')
		} else {
			props.authInvalidateResetPasswordForm(false);
			props.authServerResetPassword({ email: user_email });
		}

	}

	let handleInputChange = (event, field) => {
		let value = event.target.value;
		props.authUpdateLoginFormField({ field, value });
	}

	return (
		<div className="scooty-bg-image">
			<div className="scooty-form">
				<div className="container">
					<div className="row ">
						<div className="offset-xl-3 col-xl-6 offset-lg-3 col-lg-6 col-md-12 col-sm-12 col-12  ">
							<div className="scooty-head">
								<Link to="/"><img src="images/logo.png" className="auth-logo" alt="" /></Link>
							</div>
				
										<div className="container">
											<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
												<h3>Reset Account Password</h3>
												{props.reset_password.get('error') && <Alert message="Place enter valid email information" type="error" showIcon />}
												<Spin spinning={props.reset_password.get('submit')} size="large">
													<form onSubmit={handleSubmit}>
														<div className="row">
															<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
																<div className="form-group">
																	<label
																		className="control-label sr-only"
																		htmlFor="email"
																	/>
																	<input
																		id="username"
																		type="text"
																		name="email"
																		placeholder="email"
																		className="form-control"
																		autoFocus
																		defaultValue={user_email}
																		onChange={e => {
																			handleInputChange(e, 'email')
																		}}
																	/>
																</div>
																{props
																	.reset_password
																	.get('done') && <h6>
																		<p>Password reset request received. If your email is registered with us, you
																		will receive a password reset email.</p>
																		<p>You can alternatively &nbsp;&nbsp;
																		<Link to="/auth/login">login with your social profile</Link>
																			&nbsp;&nbsp; as well.</p>
																	</h6>
																}
															</div>
															<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
																<button
																	type="submit"
																	name="singlebutton"
																	className="btn btn-default">
																	Reset Password
									               </button>
															</div>
														</div>
													</form>
												</Spin>
												<p className="mt-2">
													Are you new here? Create a New Account.
								 <Link to="/auth/register"> Click here</Link>
												</p>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
	)
}

const ConnectResetPasswordPage = connect(mapStateToProps, mapDispatchToProps)(ResetPasswordPage)

export default ConnectResetPasswordPage;
