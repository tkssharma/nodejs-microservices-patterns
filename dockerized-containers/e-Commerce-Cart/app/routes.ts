/* eslint func-names: ["error", "never"] */
/* eslint prefer-destructuring: 0 */
import * as express from 'express';
const expressRouter= express.Router();
import defaultRoutes from './routes/defaultRoutes';
expressRouter.use('/', defaultRoutes);



export default expressRouter;
