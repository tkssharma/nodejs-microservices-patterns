const Joi = require('joi');

const validation = {
  loginUser : {
    body : {
    email: Joi.string().regex(/^[\w.]+@[\w]+?(\.[a-zA-Z]{2,3}){1,3}$/).required(),
    password: Joi.string().min(8).max(50).required()
    }
  },
  createUser: {
    body: {
      username: Joi.string().min(4).max(50).required(),
      password: Joi.string().min(8).max(50).required(),
      email: Joi.string().regex(/^[\w.]+@[\w]+?(\.[a-zA-Z]{2,3}){1,3}$/).required(),
      verify_password: Joi.string().min(6).max(50).required()
    },
  },
  resetPassword: {
    body: {
      email: Joi.string().regex(/^[\w.]+@[\w]+?(\.[a-zA-Z]{2,3}){1,3}$/).required(),
    }
  }
};
export default validation
