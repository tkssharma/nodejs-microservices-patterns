import React from 'react'
import { connect } from 'react-redux'
import * as Action from './action'
import { Link } from 'react-router'
import { Spin, Alert } from 'antd'
import Util from '../../util/helper/index';
import config from '../../config/index';
const mapStateToProps = (state, ownProps) => {
  return {
    status: state.auth.get('status'),
    login: state.auth.get('login')
  }
}
const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    authSubmitLoginForm: status => dispatch(Action.authSubmitLoginForm(status)),
    authInvalidateLoginForm: value =>
      dispatch(Action.authInvalidateLoginForm(value)),
    authUpdateLoginFormField: data =>
      dispatch(Action.authUpdateLoginFormField(data)),
    authServerLoginUser: value => dispatch(Action.authServerLoginUser(value))
  }
}

let LoginPage = props => {
  let user_email = props.login.get('email')
  console.log(user_email + 'user email');
  let user_password = props.login.get('password')

  let handleSubmit = event => {
    event.preventDefault()
    props.authSubmitLoginForm(true)

    let errorHandler = (message, description) => {
      setTimeout(() => {
        //notification.error({message: message, description: description});
        props.authInvalidateLoginForm(true)
        props.authSubmitLoginForm(false)
      }, 50)
    }

    if (!user_email || !user_password) {
      errorHandler(
        'Error Occoured!',
        'Please enter your email address and password.'
      )
    } else if (!Util.validateEmail(user_email)) {
      errorHandler('Invalid Email', 'Please enter a valid email address.')
    } else {
      props.authInvalidateLoginForm(false)
      props.authServerLoginUser({ email: user_email, password: user_password })
    }
  }

  let handleInputChange = (event, field) => {
    let value = event.target.value
    props.authUpdateLoginFormField({ field, value })
  }

  const uiLinks = (
    <div className="social social-btn">
      <a href={config.social.facebook} className="btn btn-default button block facebook">
        <i className="fa fa-facebook-official" aria-hidden="true" />
        Login with Facebook
      </a>
      <a href={config.social.google} className="btn btn-default button block google">
        <i className="fa fa-google" aria-hidden="true" />
        Login with Google
      </a>
    </div>
  )

  return (
    <div className="scooty-bg-image">
      <div className="scooty-form">
        <div className="container">
          <div className="row ">
            <div className="offset-xl-3 col-xl-6 offset-lg-3 col-lg-6 col-md-12 col-sm-12 col-12  ">
              <div className="scooty-head">
                <Link to="/"><img src="images/logo.png" className="auth-logo" alt="" /></Link>
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
                      Login
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
                        {props.login.get('error') && <Alert message="Please enter valid email and password." type="error" showIcon="false" />}
                        <Spin spinning={props.login.get('submit')} size="large">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                <div className="form-group">
                                  <label
                                    className="control-label sr-only"
                                    htmlFor="username"
                                  />
                                  <input
                                    id="username"
                                    type="text"
                                    name="username"
                                    placeholder="User Name"
                                    className="form-control"
                                    autoFocus
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
                                    htmlFor="passwordlogin"
                                  />
                                  <input
                                    id="passwordlogin"
                                    type="password"
                                    name="passwordlogin"
                                    placeholder="Password"
                                    className="form-control"
                                    defaultValue={user_password}
                                    onChange={e => {
                                      handleInputChange(e, 'password')
                                    }}
                                  />
                                </div>
                              </div>
                              <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
                                <button
                                  type="submit"
                                  name="singlebutton"
                                  className="btn btn-default">
                                  Login
                              </button>
                              </div>
                            </div>
                          </form>
                        </Spin>
                        <p className="mt-2">
                          Are you new here? Create a New Account.
                          <Link to="/auth/register"> Click here</Link>
                        </p>
                        <p className="mt-2">
                          forgot password
                          <Link to="/auth/reset-password"> Click here</Link>
                        </p>
                        {uiLinks}
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
)(LoginPage)

export default ConnectLoginPage
