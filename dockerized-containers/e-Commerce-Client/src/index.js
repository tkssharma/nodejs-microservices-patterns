import React from 'react';
import {render} from 'react-dom';
import {
	Router,
	Route,
	hashHistory,
	IndexRoute
} from 'react-router';

import {notLoggedIn} from './util/middleware/index';

import { Provider } from 'react-redux';

import store from './services/store';
// ------------------Login pages-------------------//
import RegisterPage from './services/auth/Register';
import LoginPage from './services/auth/Login';
import LogoutPage from './services/auth/Logout';
import ResetPasswordPage from './services/auth/ResetPassword';
import ValidateTokenPage from './services/auth/ValidateToken';
import AuthLayout from './layout/Auth';
//------------------dashboard-------------------//
import PublicLayout from './layout/Public';
import PublicIndexPage from './components/App';

render((
	<Provider store={store()}>
		<Router history={hashHistory}>
			<Route path="/" component={PublicLayout}  >
				<IndexRoute component={PublicIndexPage} />
			</Route>
			<Route path="auth" component={AuthLayout} >
				<Route
					path="register"
					component={RegisterPage} onEnter={notLoggedIn}
				/>
				<Route path="login" component={LoginPage} onEnter={notLoggedIn} />
				<Route path="logout" component={LogoutPage} />
				<Route path="validate-token" component={ValidateTokenPage} />
				<Route
					path="reset-password"
					component={ResetPasswordPage}
					onEnter={notLoggedIn} />
			</Route>
		</Router>
	</Provider>
), document.getElementById("root"));
