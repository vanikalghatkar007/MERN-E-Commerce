import orderModel from "../models/orderModel.js";
import userModel from "../models/userModel.js";
import Stripe from 'stripe';
import razorpay from 'razorpay';

//stripe gateway instance
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

//razorpay instance
const razorpayInstance = new razorpay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})

const currency = 'usd'
const del_charges = 10

//placing orders using COD Method
const placeOrderCod = async (req, res) =>{
    try {
        const {userId, items, amount, address} = req.body;

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'COD',
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        //clear cart data after plaing order
        await userModel.findByIdAndUpdate(userId, {cartData: {}})

        res.json({success: true, message: "Order placed!"})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//placing orders using stripe Method
const placeOrderStripe = async (req, res) =>{
    try {
        const {userId, items, amount, address} = req.body;
        //origin- link from where the user has initiated payment
        const {origin} = req.headers;
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Stripe',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const line_items = items.map((item)=>({
            price_data :{
                currency:currency,
                product_data :{
                    name: item.name
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))
        //delivery charges
        line_items.push({
            price_data :{
                currency:currency,
                product_data :{
                    name: 'Delivery Charges'
                },
                unit_amount: del_charges * 100
            },
            quantity: 1
        })
        
        //create new session
        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({success:true, session_url: session.url})
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

//verify stripe
const verifyStripe = async(req, res)=>{
    const {userId, orderId, success} = req.body;
    try {
        if (success === 'true') {
            //update payment status to true in db
            await orderModel.findByIdAndUpdate(orderId, {payment:true});
            //clear cart after payment successful
            await userModel.findByIdAndUpdate(userId, {cartData:{}});

            res.json({success: true})
        } else{
            await orderModel.findByIdAndDelete(orderId);
            res.json({success:false, message:"Payment unsuccessful"})
        }
    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
  
    }
}

//placing orders using razorpay Method
const placeOrderRazorpay = async (req, res) =>{
    try {
        const {userId, items, amount, address} = req.body;
        
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: 'Razorpay',
            payment: false,
            date: Date.now()
        }
        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString()
        }

        await razorpayInstance.orders.create(options, (error, order)=>{
            if (error) {
                console.log(error)
                return res.json({success:false, message:error})
            }
            res.json({success:true, order})
        })

    } catch (error) {
        console.log(error)
        res.json({success:false, message:error.message})
    }
}

const verifyRazorpay = async (req, res)=>{
    try {
        const {userId, razorpay_order_id} = req.body;

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        if(orderInfo.status === 'paid'){
            await orderModel.findByIdAndUpdate(orderInfo.receipt, {payment:true})
            await userModel.findByIdAndUpdate(userId, {cartData:{}})

            res.json({success:true, message:'Payment successful'})
        } else{
            res.json({success:false, message:'Payment failed'})
        }
        
    } catch (error) {
        console.log(error);
        res.json({success:false, message:error.message})
    }
}

//All orders on Admin Panel
const allOrders = async (req, res) =>{
    try {
        const orders = await orderModel.find({})
        res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

//User orders on User Panel
const userOrders = async (req, res) =>{
    try {
        const {userId} = req.body;

        const orders = await orderModel.find({userId})

        return res.json({success:true, orders})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
    
}

//update order status from Admin panel
const updateOrderStatus = async (req, res) =>{
    try {
        const {orderId, status} = req.body;

        await orderModel.findByIdAndUpdate(orderId, {status})
        res.json({success:true, message:"Status Updated"})
    } catch (error) {
        console.log(error)
        res.json({success: false, message:error.message})
    }
}

export {verifyRazorpay, verifyStripe,placeOrderCod, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateOrderStatus}