import {
  REDUX_RESET_STATE,
  AUTH_UPDATE_REGISTER_FORM_FIELD,
  AUTH_SUBMIT_REGISTER_FORM,
  AUTH_INVALIDATE_REGISTER_FORM,
  AUTH_RESET_REGISTER_FORM_FIELDS,
  AUTH_UPDATE_USER_DATA,
  AUTH_RESET_USER_DATA,
  AUTH_UPDATE_USER_FIELD,
  AUTH_UPDATE_LOGIN_FORM_FIELD,
  AUTH_SUBMIT_LOGIN_FORM,
  AUTH_INVALIDATE_LOGIN_FORM,
  AUTH_RESET_LOGIN_FORM_FIELDS,
  AUTH_SUBMIT_RESET_PASSWORD_FORM,
  AUTH_UPDATE_RESET_PASSWORD_STATUS_FIELD,
  AUTH_INVALIDATE_RESET_PASSWORD_FORM,
  USER_UPDATE_PROFILE,
	USER_UPDATE_PROFILE_FIELD,
	USER_DELETE_PROFILE_FIELD,
  USER_PROFILE_LOADED,
  UPDATE_FIELD,
  UPDATE_SECTION,
  UPDATE_TABS,
  UPDATE_LOADED
} from "./actionTypes";




import axios from "axios";
import * as API from "../../api/index";
import { message, notification } from "antd";
import Auth from "../../util/middleware/auth";
import jwt from "jsonwebtoken";
import { hashHistory } from "react-router";


export function stopLoading() {
  return {
    type: "STOP_LOADING"
  };
}
export function initiateLoading() {
  return {
    type: "INITIATE_LOADING"
  };
}
export function reduxResetState() {
  return { type: REDUX_RESET_STATE };
}

//----------------------------------------------------------------//
export function fetchProfileSuccess(data) {
  return {
    type: "FETCH_PROFILE_SUCCESS",
    payload: {
      data: data
    }
  };
}
export function fetchProfile() {
  let token = Auth.getAuthToken();

  if (token === undefined) {
    return { type: "TOKEN_NOT_FOUND" };
  } else {
    API.setAuthToken(token);
  }
  return dispatch => {
    return axios
      .get(API.url("userfetch"))
      .then(response => {
        let json = response.data;
        dispatch(fetchProfileSuccess(json));
      })
      .catch(error => {});
  };
}
export function authUpdateRegisterFormField(data) {
  return { type: AUTH_UPDATE_REGISTER_FORM_FIELD, payload: data };
}
export function authSubmitRegisterForm(data) {
  return { type: AUTH_SUBMIT_REGISTER_FORM, payload: data };
}
export function authInvalidateRegisterForm(data) {
  return { type: AUTH_INVALIDATE_REGISTER_FORM, payload: data };
}
export function authResetRegisterFormFields() {
  return { type: AUTH_RESET_REGISTER_FORM_FIELDS };
}

export function authServerRegisterUser(data) {
  return dispatch => {
    let nofity_message = message.info("Creating your account...", 0);

    return axios
      .post(API.url("register"), data)
      .then(response => {
        let json = response.data;
        nofity_message();
        dispatch(authSubmitRegisterForm(false));

        if (json.success !== true) {
          message.info("Error occoured while creating account.", 3);
          notification.warning({
            message: "Error Occoured",
            description: json.error
          });
        } else {
          dispatch(authResetRegisterFormFields());
          message.info("Account successfully created. You can login now.", 3);
          hashHistory.push('/auth/login');
        }
      })
      .catch(error => {
        dispatch(authSubmitRegisterForm(false));
        notification.warning({ message: "Error Occoured", description: error });
      });
  };
}
export function authUpdateLoginFormField(data) {
  return { type: AUTH_UPDATE_LOGIN_FORM_FIELD, payload: data };
}
export function authSubmitLoginForm(status) {
  return { type: AUTH_SUBMIT_LOGIN_FORM, payload: status };
}
export function authInvalidateLoginForm(data) {
  return { type: AUTH_INVALIDATE_LOGIN_FORM, payload: data };
}

export function authResetLoginFormFields() {
  return { type: AUTH_RESET_LOGIN_FORM_FIELDS };
}

export function authUpdateUserData(data) {
  return { type: AUTH_UPDATE_USER_DATA, payload: data };
}

export function authUpdateUserField(data) {
  return { type: AUTH_UPDATE_USER_FIELD, payload: data };
}

export function authResetUserData() {
  return { type: AUTH_RESET_USER_DATA };
}

export function authServerLoginUser(data) {
  return dispatch => {
    let nofity_message = message.info("Logging you in.. please wait", 0);

    return axios
      .post(API.url("login"), data)
      .then(response => {
        let json = response.data;
        nofity_message();
        dispatch(authSubmitLoginForm(false));

        if (json.success === false) {
          message.info( json.message || "Please provide valid email & password", 3);
          notification.warning({
            message: json.message || "Error Occoured",
            description: JSON.stringify(json.error, null, 2)
          });
        } else {
          dispatch(authResetLoginFormFields());
          message.info("Successfully logged in", 3);
          Auth.setAccessToken(json.token);
          API.setAuthToken(json.token);
          const userToken = jwt.decode(json.token);
          dispatch(authUpdateUserData(jwt.decode(json.token)));
          if(userToken.type === '1'){
            // hashHistory.push(routes.user_dashboard);
          } else {
           // hashHistory.push(routes.vendor_dashboard);
          }
          
        }
      })
      .catch(error => {
        nofity_message();
        dispatch(authSubmitLoginForm(false));
        if(error.response && error.response.data) {
          notification.warning({
            message: "unable to login",
            description:
            error.response.data.message
          });
        }
      });
  };
}

export function authSubmitResetPasswordForm(status) {
  return { type: AUTH_SUBMIT_RESET_PASSWORD_FORM, payload: status };
}
export function authUpdateResetPasswordStatusField(data) {
  return { type: AUTH_UPDATE_RESET_PASSWORD_STATUS_FIELD, payload: data };
}

export function authInvalidateResetPasswordForm(data) {
  return { type: AUTH_INVALIDATE_RESET_PASSWORD_FORM, payload: data };
}

export function authServerResetPassword(data) {
  return dispatch => {
    return axios
      .post(API.url("reset_password"), data)
      .then(response => {
        let json = response.data;
        dispatch(authSubmitResetPasswordForm(false));

        if (json.success === false) {
          message.info("User does not exist in System, Provide valid email", 2);
          notification.warning({
            message: "Error Occoured",
            description: json.description
          });
        } else {
          message.info("Password reset request was successful.", 3);
          dispatch(
            authUpdateResetPasswordStatusField({ field: "done", value: true })
          );
        }
      })
      .catch(error => {
        dispatch(authSubmitResetPasswordForm(false));
        if(error.response && error.response.data) {
          notification.warning({
            message: "unable to reset password",
            description:
            error.response.data.message
          });
        }
      });
  };
}

export function userProfileLoaded(data) {
  return { type: USER_PROFILE_LOADED, payload: data };
}

export function userUpdateProfile(data) {
  return { type: USER_UPDATE_PROFILE, payload: data };
}

export function userUpdateProfileField(data) {
  return { type: USER_UPDATE_PROFILE_FIELD, payload: data };
}

export function userDeleteProfileField(data) {
  return { type: USER_DELETE_PROFILE_FIELD, payload: data };
}

export function updateField( data ) {
	return {
		type: UPDATE_FIELD,
		payload: data
	}
}
export function updateSection( data ) {
	return {
		type: UPDATE_SECTION,
		payload: data
	}
}

export function updateTabs( data ) {
	return {
		type: UPDATE_TABS,
		payload: data
	}
}

export function updateLoaded( data ) {
	return {
		type: UPDATE_LOADED,
		payload: data
	}
}
