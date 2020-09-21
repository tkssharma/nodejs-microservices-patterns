
  import React from 'react';
	import { Link } from 'react-router';
	import { connect } from 'react-redux';
	import * as Action from './action';

	import Auth from '../../util/middleware/auth';
	import { message } from 'antd';

	const mapStateToProps = ( state, ownProps ) => {
		return {
			user: state.auth.get('user'),
		}
	}

	const mapDispatchToProps = ( dispatch, ownProps ) => {
		return {
			authResetUserData: () => dispatch( Action.authResetUserData() ),
			reduxResetState: () => dispatch( Action.reduxResetState() ),

		}
	}

	let LogoutPage = (props) => {
		if ( props.user.size > 0 ) {
			setTimeout( () => {
				Auth.logout();
				props.authResetUserData();
				props.reduxResetState();
				message.info('You have been successfully logged out', 3);
			}, 20 );
		}
		const ui_message_logout = (
			<div className="content">
				<h3>Logging you out right now...</h3>
				<p className="m-t-10">please be patient.</p>
			</div>
		);

		const ui_message_done = (
			<div className="content">
				<h5>You have been successfully logged out.</h5>
				<Link  to="/auth/login" className="button default inline m-t-20 label-marker">Login Again &rarr;</Link>
			</div>
		);

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
					  <div className="tab-content" id="myTabContent">
						<div
						  className="tab-pane active"
						  id="tab2"
						  role="tabpanel"
						  aria-labelledby="tab-2">
						  <div className="container">
							<div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12 ">
							  { props.user.get('id') ? ui_message_logout : ui_message_done }
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

	const ConnectLogoutPage = connect(
		mapStateToProps,
		mapDispatchToProps
	)(LogoutPage)

	export default ConnectLogoutPage;
