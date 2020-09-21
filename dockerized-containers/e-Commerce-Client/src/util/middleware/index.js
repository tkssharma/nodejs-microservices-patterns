import Auth from './auth';


function authenticatedUsersOnly( nextState, replace ) {
	if( nextState.location.pathname !== '/user/dashboard' ) {
		if ( sessionStorage.redirect_after_login ) {
			localStorage.removeItem('redirect_after_login');
		}
		sessionStorage.setItem( 'redirect_after_login', nextState.location.pathname);
	}

	if ( !Auth.loggedIn() ) {
		replace({
			pathname: '/auth/login',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}



function userTypeHostOnly( nextState, replace, store ) {
	const state = store.getState();

	if ( state.auth.get('user').get('userType') !== 2 ) {
		replace({
			pathname: '/user/dashboard/home',
			state: { nextPathname: nextState.location.pathname }
		});
	}

}
function notLoggedIn( nextState, replace ) {
	if ( Auth.loggedIn() ) {
		replace({
			pathname: '/user/dashboard/home',
			state: { nextPathname: nextState.location.pathname }
		});
	}
}

function logoutUser( nextState, replace ) {
	Auth.logout();
	replace({
		pathname: '/user/dashboard/home',
		state: { nextPathname: nextState.location.pathname }
	});

}


export { authenticatedUsersOnly };
export { notLoggedIn };
export { logoutUser };
export { userTypeHostOnly };
