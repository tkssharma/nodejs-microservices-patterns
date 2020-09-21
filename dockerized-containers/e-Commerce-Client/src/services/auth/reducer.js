import {
	AUTH_UPDATE_REGISTER_FORM_FIELD,
	AUTH_SUBMIT_REGISTER_FORM,
	AUTH_INVALIDATE_REGISTER_FORM,
	AUTH_RESET_REGISTER_FORM_FIELDS,
	AUTH_UPDATE_USER_DATA,
	AUTH_RESET_USER_DATA,
	AUTH_UPDATE_USER_FIELD,
	AUTH_SUBMIT_LOGIN_FORM,
	AUTH_UPDATE_LOGIN_FORM_FIELD,
	AUTH_INVALIDATE_LOGIN_FORM,
	AUTH_RESET_LOGIN_FORM_FIELDS,
	AUTH_SUBMIT_RESET_PASSWORD_FORM,
	AUTH_UPDATE_RESET_PASSWORD_STATUS_FIELD,
	AUTH_INVALIDATE_RESET_PASSWORD_FORM,

} from './actionTypes';

import Immutable from 'immutable';

const application_default_data = Immutable.Map({

	status: Immutable.Map({
		logged_in: false,
		in_progress: false,
    }),

	user: Immutable.Map({}), // this contains the decoded token data

	register: Immutable.Map({
		submit: false,
		error: false,
		name: '',
		email: '',
		address: '',
		password: '',
		password_confirm: '',
    }),

	login: Immutable.Map({
		submit: false,
		error: false,
		email: '',
		password: '',
    }),

	reset_password: Immutable.Map({
		submit: false,
		done: false,
		error: false,
    }),

});



function auth( auth = application_default_data, action ) {



	if ( action.type === AUTH_UPDATE_REGISTER_FORM_FIELD ) {
		return auth.setIn(['register', action.payload.field ], action.payload.value );
	}
	else if ( action.type === AUTH_SUBMIT_REGISTER_FORM ) {
		return auth.setIn(['register', 'submit'], action.payload );
	}
	else if ( action.type === AUTH_INVALIDATE_REGISTER_FORM ) {
		return auth.setIn(['register', 'error'], action.payload );
	}
	else if ( action.type === AUTH_RESET_REGISTER_FORM_FIELDS ) {
		return auth
				.setIn(['register', 'submit'], false )
				.setIn(['register', 'error'], false )
				.setIn(['register', 'name'], '' )
				.setIn(['register', 'email'], '' )
				.setIn(['register', 'address'], '' )
				.setIn(['register', 'password'], '' )
				.setIn(['register', 'password_confirm'], '' );
	}

	else if ( action.type === AUTH_SUBMIT_LOGIN_FORM ) {
		return auth.setIn(['login', 'submit'], action.payload );
	}

	else if ( action.type === AUTH_UPDATE_LOGIN_FORM_FIELD ) {
		return auth.setIn(['login', action.payload.field ], action.payload.value );
	}

	else if ( action.type === AUTH_INVALIDATE_LOGIN_FORM ) {
		return auth.setIn(['login', 'error'], action.payload );
	}
	else if ( action.type === AUTH_RESET_LOGIN_FORM_FIELDS ) {
		return auth
				.setIn(['login', 'submit'], false )
				.setIn(['login', 'error'], false )
				.setIn(['login', 'email'], '' )
				.setIn(['login', 'password'], '' );
	}


	else if ( action.type === AUTH_UPDATE_USER_DATA ) {
		return auth.set('user', Immutable.Map(action.payload) );
	}

	else if ( action.type === AUTH_UPDATE_USER_FIELD ) {
		return auth.setIn(['user', action.payload.key ], action.payload.value );
	}

	else if ( action.type === AUTH_RESET_USER_DATA ) {
		return auth.set('user', Immutable.Map({}) );
	}



	else if ( action.type === AUTH_SUBMIT_RESET_PASSWORD_FORM ) {
		return auth.setIn(['reset_password', 'submit'], action.payload );
	}
	if ( action.type === AUTH_UPDATE_RESET_PASSWORD_STATUS_FIELD ) {
		return auth.setIn(['reset_password', action.payload.field ], action.payload.value );
	}

	else if ( action.type === AUTH_INVALIDATE_RESET_PASSWORD_FORM ) {
		return auth.setIn(['reset_password', 'error'], action.payload );
	}


	else {
		return auth;
	}


}


export default auth;
