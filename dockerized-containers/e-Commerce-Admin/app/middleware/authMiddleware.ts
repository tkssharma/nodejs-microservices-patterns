const jwt = require("jsonwebtoken");
import responseTemplate from '../helper/responseTemplate';
import User from '../models/user';
const validation: any = {
  validateToken(req, res, next) {
    // validatr token here is its valid here
    const token = req.headers.authorization;
    if (token) {
      jwt.verify(token, "secretkey", (err, data) => {
        if (err) {
          res.status(403).json(responseTemplate.commonAuthUserDataError());
        } else {
          User.findById(data.id, (error, user) => {
            if(error){
              res.status(403).json(responseTemplate.commonAuthUserDataError());
            } 
            user.hasPassword = user.password ? true : false;
            req.user = user;
            next();
          })
        }
      });
    } else {
      res.status(403).json(responseTemplate.tokenRequiredAuthError());
    }
  }
};

export default validation;
