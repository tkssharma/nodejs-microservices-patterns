'use strict';

import _ from 'lodash';
// import ReviewTransformer from './ReviewTransformer';


let UserTransformer = {
  xx : (users) =>{
    if ( Array.isArray(users) ) {
			let output = [];
			users.forEach(( user ) => {
				output.push( UserTransformer._transformUsers(user) );
			});
			return output;
		}
		else {
			return UserTransformer._transformUsers(users);
		}
  },
  transform: (users) => {
    if (Array.isArray(users)) {
      let output = [];
      users.forEach((user) => {
        output.push(UserTransformer._transform(user));
      });
      return output;
    }
    else {
      return UserTransformer._transform(users);
    }
  },
  calculateUsers: (users: any | null) => {
    if (Array.isArray(users)) {
      return {
        Users : users.length ? users.length : 100,
        vehicles : (users['vehicle'] ) ? users['vehicle'].length : 1000,
        cities :100
      }
    }
  },

  _transform: (user) => {
    if (!user) { return {}; }
    let user_status = (user.status === 1) ? 'active' : 'disabled';
    return {
      id: user._id,
      username : user.username,
      status: user_status,
      name: user.name,
      email: user.email,
      password: (user.password) ? true : false,
      phone: user.phone || '',
      gender: user.gender || '',
      birthday: user.birthday || '',
      type: user.type || 1,
      meta: user.meta || {},
      social : user.social || [],
      phone_verified: user.phone_verified ? true : false,
      email_verified: user.email_verified ? true : false,
      profile_picture: user.profile_picture ? null : null // will fix later
    };
  },
  transformUsers: ( users ) => {
		if ( Array.isArray(users) ) {
			let output = [];
			users.forEach(( user ) => {
				output.push( UserTransformer._transformUsers(user) );
			});
			return output;
		}
		else {
			return UserTransformer._transformUsers(users);
		}
	},
	_transformUsers: ( user ) => {
		if ( ! user ) { return {}; }
    let user_status = ( user.status === '1' ) ? 'active' : 'disabled';
    const obj:any = {};

		return Object.assign({}, {
      id: user._id,
      username : user.username,
      status: user_status,
      name: user.name,
      email_verified:user.email_verified,
      phone_verified :user.phone_verified,
      reviews : user.reviews,
      vehciles : user.vehciles,
      email: user.email,
      date : user.createdAt,
      type: user.type || 1,
		}, obj);
  }
}

export default UserTransformer;

