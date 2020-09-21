import * as express from "express";
const router = express.Router();
const passport = require("passport");
import UserController from "../controller/UserController";
const jwt = require("jsonwebtoken");
// seralize user Object
import  ResponseTemplate from '../global/templates/response';
import * as expressJoiValidator from "express-joi-validator";
import expressJoi from "../lib/requestValidator";
const boom = require("express-boom");
import { Router } from "express";
const path = require('path')
const fs = require('fs');
const { uploadpath } = global['configuration']
const multer = require('multer');
import Helper from '../helper/bcrypt';


let profileStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb( null, path.join( uploadpath.uploaddir, uploadpath.profiledir ) );
	},
	filename: function (req, file, cb) {
		let extension = Helper.getFileExtension(file.originalname);
		cb( null, `${req.user.id}-${ Helper.randomString() }.${extension}` );
	}
})
let upload = multer({ storage: profileStorage });

let documentStorage = multer.diskStorage({
	destination: function (req, file, cb) {
		cb( null, path.join( uploadpath.uploaddir, uploadpath.documentdir ) );
	},
	filename: function (req, file, cb) {
		let extension = Helper.getFileExtension(file.originalname);
		cb( null, `${req.user.id}-${ Helper.randomString() }.${extension}` );
	}
})
let uploadDocuments = multer({ storage: documentStorage });


export class AuthRouter {
  router: Router;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }

  /**
 * @api {POST} /auth/reset-password update password sent in Mail
 * @apiName resetPassword
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code from API.
 * @apiSuccess {String} message Message from API.
 */
public resetPassword(req, res){
		UserController.resetPassword( req.body.email, ( error, success) => {
			console.log(error)
			if ( error ) {
				res.status(403).json({success : false, message: error, description: 'error occoured while resetting password' });
			} else {
				res.json({
					statusCode: 200,
					message: 'success',
					description: 'if this email is registered with us, you will receive a password reset email soon.',
				});
			}
		});
};

public updateUser(req, res){
  UserController.updateUser(req.params.email, req.body ,( error, success) => {
    if ( error ) {
      res.status(403).json({success : false, message: error, description: 'error occoured while updating user' });
    } else {
      res.json({
        statusCode: 200,
        message: 'success',
        description: 'user updated successfully',
      });
    }
  });
}
public getUserByEmail(req, res){
  UserController.getUserByEmail(req.params.email ,( error, user) => {
    if ( error ) {
      res.status(403).json({success : false, message: error, description: 'error occoured while updating user' });
    } else {
      res.json({
        statusCode: 200,
        message: 'success',
        data: user
      });
    }
  });
}

public uploadProfilepicture(req, res){
  UserController.updateUser( req.user.email, { picture: req.file.filename }, ( error, user ) => {
		if ( error ) {
			res.json( ResponseTemplate.updateErrorOccoured(error) );
		} else {
			res.json( ResponseTemplate.success(
				'your profile picture has been successfully uploaded',
				{ picture: Helper.avatarURL(user.picture) })
			);
		  Helper.deleteFile( 'profile', req.user.picture );
		}
	});
}
// upload users profile picture.
public uploadDocuments(req, res){
  let documents:any = {};
	req.files.map( (file) => {
		documents.url = file.filename;
		documents.originalname = file.originalname;
		documents.timestamp = new Date();
	});

	UserController.updateUser( req.user.email, { document: documents }, ( error, user ) => {
		if ( error ) {
			res.json( ResponseTemplate.updateErrorOccoured(error) );
		} else {
			let userDocuments = [];
			if ( user.documents ) {
				user.documents.map( (doc) => {
					userDocuments.push( Helper.userDocumentURL(doc.url) );
				});
			}
			res.json( ResponseTemplate.success(
				'host documents have been successfully uploaded',
				{ documents: userDocuments })
			);
		}
	});
}

  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.get("/:email", this.getUserByEmail);
    this.router.get("/reset-password/:email",expressJoiValidator(expressJoi.resetPassword),  this.resetPassword);
    this.router.put("/update/:email", this.updateUser);
    this.router.post('/upload-profile-picture', upload.single('avatar'), this.uploadProfilepicture);
    this.router.post('/upload-documents', uploadDocuments.array('documents'), this.uploadDocuments);
  }
}

// Create the HeroRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;
