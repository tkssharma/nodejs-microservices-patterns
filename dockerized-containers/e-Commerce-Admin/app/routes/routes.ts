import * as express from "express";
import UserController from "../controller/UserController";
const jwt = require("jsonwebtoken");
// seralize user Object
const url = global['configuration'].url;
import LocaleRoute from "./provider/Locale";
import * as expressJoiValidator from "express-joi-validator";
import expressJoi from "../lib/requestValidator";
// import FacebookRoutes from "./provider/Facebook";
import GoogleRoutes from "./provider/Google";
// import LinkedinRoutes from "./provider/Linkedin";
import Template from "../helper/responseTemplate";
// import TwitterRoute from "./provider/Twitter";
import * as template from '../helper/responseTemplate';
const boom = require("express-boom");
import { Router, Request, Response, NextFunction } from "express";
import helper from '../helper/bcrypt';
import ValidAuthTokenMiddleware from '../middleware/authMiddleware';

export class AuthRouter {
  router: Router;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
    this.init();
  }
  public register(req: any, res: any) {
    UserController.registerDefault(req, res, (error, user) => {
      if (error) {
        res.status(400).json(Template.userAlreadyExist(error.message));
      } else {
        res.json({
          statusCode: 200,
          success: true,
          message: "user created successfully",
          user
        });
      }
    });
  }
  public login(req: any, res: any) {
    UserController.validateUser(req, res, (err, token) => {
      if (err) {
        res.status(401).json(Template.userdoesNotExist(err));
      } else {
        res.status(200).json({
          success: true,
          message: "success",
          token
        });
      }
    });
  }

  public redirectSocialUser(req, res) {
    jwt.sign(helper.buildUserToken(req.user), "secretkey", (tokError, token) => {
      if (tokError) {
        res.boom.badImplementation(tokError);
      } else {
        // redirect app to FE app routes with Token
        console.log('redirecting Now...');
        res.redirect(helper.authRedirectUrl(`?token=${token}`));
        /* res.json({
           statusCode: 200,
           message: "success",
           token
         }); */
      }
    });
  }
  public validate(req: any, res: any) {
    res.json({
      statusCode: 200,
      message: 'validated succsessfully',
      success: true,
      user : req.user
    });
  }

  /**
 * @api {POST} /auth/reset-password update password sent in Mail
 * @apiName resetPassword
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code from API.
 * @apiSuccess {String} message Message from API.
 */
  public resetPassword(req, res) {
    UserController.resetPassword(req.body.email, (error, success) => {
      console.log(error)
      if (error) {
        res.status(403).json({ success: false, message: error, description: 'error occoured while resetting password' });
      } else {
        res.json({
          statusCode: 200,
          message: 'success',
          description: 'if this email is registered with us, you will receive a password reset email soon.',
        });
      }
    });
  };

  public activateUserAccount(req, res) {
    UserController.activateUserAccount(req.params.uuid, (error, success) => {
      if (error) {
        res.status(403).json({ success: false, message: error, description: 'error occoured while activating user' });
      } else {
        res.redirect(url.FE);
      }
    });
  }
  /**
   * Take each handler, and attach to one of the Express.Router's
   * endpoints.
   */
  init() {
    this.router.post("/login", expressJoiValidator(expressJoi.loginUser), this.login);
    this.router.get("/validate", ValidAuthTokenMiddleware.validateToken, this.validate);
    this.router.post("/register", expressJoiValidator(expressJoi.createUser), this.register);
    this.router.post("/reset-password", expressJoiValidator(expressJoi.resetPassword), this.resetPassword);
    this.router.get("/activate/:uuid", this.activateUserAccount);
    /**
     * @api {POST} /auth/login/facebook Social Login
     * @apiName google
     * @apiGroup Auth
     * @apiSuccess {String} code HTTP status code from API.
     * @apiSuccess {String} message Message from API.
     */
    /*
    this.router.get("/login/facebook", FacebookRoutes.authenticate());
    this.router.get(
      "/callback/facebook",
      FacebookRoutes.callback(),
      this.redirectSocialUser
    );
   */
    /**
     * @api {POST} /auth/login/google Social Login
     * @apiName google
     * @apiGroup Auth
     * @apiSuccess {String} code HTTP status code from API.
     * @apiSuccess {String} message Message from API.
     */
    this.router.get("/login/google", GoogleRoutes.authenticate());
    this.router.get(
      "/callback/google",
      GoogleRoutes.callback(),
      this.redirectSocialUser
    );

    /**
     * @api {POST} /auth/login/twitter Social Login
     * @apiName twitter
     * @apiGroup Auth
     * @apiSuccess {String} code HTTP status code from API.
     * @apiSuccess {String} message Message from API.
     */
    /*this.router.get("/login/twitter", TwitterRoute.authenticate("twitter"));
    this.router.get(
      "/callback/twitter",
      TwitterRoute.callback(),
      this.redirectSocialUser
    ); */

    /**
     * @api {POST} /auth/login/linkedin Social Login
     * @apiName linkedin
     * @apiGroup Auth
     * @apiSuccess {String} code HTTP status code from API.
     * @apiSuccess {String} message Message from API.
     */
    /*
    this.router.get("/login/likedin", LinkedinRoutes.authenticate());
    this.router.get("/login/linkedin", LinkedinRoutes.authenticate());
    this.router.get(
      "/callback/linkedin",
      LinkedinRoutes.callback(),
      this.redirectSocialUser
    ); */
  }
}

// Create the HeroRouter, and export its configured Express.Router
const authRoutes = new AuthRouter();
authRoutes.init();

export default authRoutes.router;
