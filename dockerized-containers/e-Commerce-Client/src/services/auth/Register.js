import React from 'react'
import { connect } from 'react-redux'
import * as Action from './action'
import { Link } from 'react-router'
import { Spin, Alert, notification } from 'antd'
import Util from '../../util/helper/index';
const mapStateToProps = (state, ownProps) => {
  return {
    register: state.auth.get('register')
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authSubmitRegisterForm: status =>
      dispatch(Action.authSubmitRegisterForm(status)),
    authUpdateRegisterFormField: data =>
      dispatch(Action.authUpdateRegisterFormField(data)),
    authInvalidateRegisterForm: value =>
      dispatch(Action.authInvalidateRegisterForm(value)),
    authServerRegisterUser: value =>
      dispatch(Action.authServerRegisterUser(value))
  }
}

let RegisterPage = props => {
  // get data from state and assign
  //
  let user_name = props.register.get('username')
  let user_email = props.register.get('email')
  let user_password = props.register.get('password')
  let user_password_confirm = props.register.get('password_confirm')

  let handleSubmit = event => {
    event.preventDefault()
    props.authSubmitRegisterForm(true)

    let errorHandler = (message, description) => {
      setTimeout(() => {
        notification.error({ message: message, description: description })
        props.authInvalidateRegisterForm(true)
        props.authSubmitRegisterForm(false)
      }, 50)
		}
    if (!user_name || !user_email || !user_password || !user_password_confirm) {
      errorHandler('Error Occoured!', 'Please enter all the fields.')
    } else if (!Util.validateEmail(user_email)) {
      errorHandler('Invalid Email', 'Please enter a valid email address.')
    } else if (user_password !== user_password_confirm) {
      errorHandler(
        'Password Mismatch',
        'Your password and verify password is not same.'
      )
    } else if (user_password.length <= 6) {
      errorHandler(
        'Password length',
        'Your password should have minimum 6 Character.'
      )
    } else {
      props.authInvalidateRegisterForm(false)
      props.authServerRegisterUser({
        username: user_name,
        email: user_email,
        address: null,
        password: user_password,
        verify_password: user_password_confirm
      })
    }
  }

  let handleInputChange = (event, field) => {
    let value = event.target.value
    props.authUpdateRegisterFormField({ field, value })
	}

  return (
	<div className="scooty-bg-image">
	<div className="scooty-form">
	  <div className="container">
		<div className="row ">
		  <div className="offset-xl-3 col-xl-6 offset-lg-3 col-lg-6 col-md-12 col-sm-12 col-12  ">
			<div className="scooty-head">
					  <Link to="/"><img src="images/logo.png" className="auth-logo" alt=""/></Link>
			  </div>
			<div className="st-tab">
			  <ul
				className="nav nav-tabs nav-justified"
				id="Mytabs"
				role="tablist">
				<li className="nav-item">
				  <a
					className="nav-link"
					id="tab-2"
					data-toggle="tab"
					href="#tab2"
					role="tab"
					aria-controls="tab-2"
					aria-selected="false">
					Register
				  </a>
				</li>
			  </ul>
			  <div className="tab-content" id="myTabContent">
				<div
				  className="tab-pane active"
				  id="tab2"
				  role="tabpanel"
				  aria-labelledby="tab-2">
				  <div className="container">
					<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
					  <h3>Sign In to Your Account</h3>
					  <p>
						Sign in to find best rental scooty
					  </p>
					  <Spin spinning={props.register.get('submit')} size="large">
					  <form onSubmit={handleSubmit}>
					  {props.register.get('error') && (
						<Alert
							message="Place enter all the fields with valid information."
							type="error"
						/>
						)}
						<div className="row">
						  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
							<div className="form-group">
							  <label
								className="control-label sr-only"
								htmlFor="username"
							  />
								<input
									type="text"
									placeholder="full name"
									autoFocus
									className="form-control"
									defaultValue={user_name}
									onChange={e => {
									handleInputChange(e, 'username')
									}}
								/>
							</div>
						  </div>
						  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
							<div className="form-group service-form-group">
							  <label
								className="control-label sr-only"
								htmlFor="email"
							  />
							   <input
									type="text"
									className="form-control"
									placeholder="email address"
									defaultValue={user_email}
									onChange={e => {
									handleInputChange(e, 'email')
									}}
								/>
							</div>
						  </div>
						
						  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
							<div className="form-group service-form-group">
							  <label
								className="control-label sr-only"
								htmlFor="password"
							  />
							   <input
									type="password"
									className="form-control"
									placeholder="password"
									defaultValue={user_password}
									onChange={e => {
									handleInputChange(e, 'password')
									}}
								/>
							</div>
						  </div>
						  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
							<div className="form-group service-form-group">
							  <label
								className="control-label sr-only"
								htmlFor="password"
							  />
							   <input
									type="password"
									placeholder="verify password"
									className="form-control"
									defaultValue={user_password_confirm}
									onChange={e => {
									handleInputChange(e, 'password_confirm')
									}}
								/>
							</div>
						  </div>
						  <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
							<button
							  type="submit"
							  name="singlebutton"
							  className="btn btn-default">
							  Register
							</button>
						  </div>
						</div>
					  </form>
					  </Spin>
					  <p className="mt-2">
						Are you new here? Create a New Account.
						<Link to="/auth/login"> Click here</Link>
					  </p>
					</div>
				  </div>
				</div>
			  </div>
			</div>
		  </div>
		</div>
	  </div>
	</div>
  </div>
  )
}

const ConnectLoginPage = connect(
  mapStateToProps,
  mapDispatchToProps
)(RegisterPage)

export default ConnectLoginPage
