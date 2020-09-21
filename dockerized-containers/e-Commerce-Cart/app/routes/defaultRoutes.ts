import * as express from "express";
const router = express.Router();

import { Router } from "express";
import product from '../models/data/cart';


export class DefaultRouter {
  router: Router;

  /**
   * Initialize the HeroRouter
   */
  constructor() {
    this.router = Router();
  }
  /**
 * @api {POST} /auth/reset-password update password sent in Mail
 * @apiName resetPassword
 * @apiGroup Auth
 * @apiSuccess {String} code HTTP status code from API.
 * @apiSuccess {String} message Message from API.
 */
  public sayHello(req, res) {
    res.status(200).json({ success: true, message: 'i am up and running with mysql + node .. ⚡️⚡️⚡️⚡️⚡️⚡️⚡️' });
  };
  public getProducts(req, res) {
    res.status(200).json(product);
  };

  init() {
    this.router.get("/", this.sayHello);
    this.router.get("/products", this.getProducts);

  }
}


// Create the HeroRouter, and export its configured Express.Router
const defaultRouter = new DefaultRouter();
defaultRouter.init();

export default defaultRouter.router;
