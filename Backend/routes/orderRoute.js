import express from 'express';
import { placeOrderCod, placeOrderRazorpay,placeOrderStripe,allOrders,updateOrderStatus,userOrders, verifyStripe, verifyRazorpay } from '../controllers/orderController.js';
import adminAuth from '../middleware/adminAuth.js';
import authUser from '../middleware/userAuth.js';

const orderRouter = express.Router();

//Admin features
orderRouter.get('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

//Payment features
orderRouter.post('/place-order', authUser, placeOrderCod);
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)

//User features
orderRouter.get('/user-orders', authUser, userOrders)

//verify payment
orderRouter.post('/verify-stripe', authUser, verifyStripe)
orderRouter.post('/verify-razorpay', authUser, verifyRazorpay)


export default orderRouter