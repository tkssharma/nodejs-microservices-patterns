import server from '../config/server';

export default {
	// server: server

	social: {
		facebook: server.url + 'auth/login/facebook',
		google: server.url + 'auth/login/google',
		twitter: server.url + 'auth/login/twitter',
		instagram: server.url + 'auth/login/instagram',
	},

	google: {
		api_key: '***',
	},


}
