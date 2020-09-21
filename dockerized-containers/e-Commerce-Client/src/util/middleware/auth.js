import * as API from '../../api'

export default {

	loggedIn: () => {
		return !! localStorage.token
	},

	setAccessToken: (token) => {
		localStorage.token = token;
	},

	getAccessToken: (token) => {
		return localStorage.token;
	},


	deleteAccessToken: () => {
		delete localStorage.token
	},

	logout: () => {
		delete localStorage.token;
		delete localStorage.user_hasPassword;
		delete localStorage.user_userType;
		delete localStorage.auth_background;
		delete sessionStorage.redirect_after_login;
		API.setAuthToken();
	},
}

