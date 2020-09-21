/* eslint func-names: ["error", "never"] */
/* eslint prefer-destructuring: 0 */
import * as express from 'express';
const expressRouter= express.Router();
import authRoutes from './routes/routes';
import userRoutes from './routes/userRoutes';
import defaultRoutes from './routes/defaultRoutes';
import validAuthTokenMiddleware from './middleware/authMiddleware';
expressRouter.use('/', defaultRoutes);
expressRouter.use('/uploads/', express.static('uploads'));
expressRouter.use('/auth', authRoutes);
expressRouter.use('/user',validAuthTokenMiddleware.validateToken, userRoutes);



export default expressRouter;
