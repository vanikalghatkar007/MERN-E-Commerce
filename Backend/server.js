import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import userRouter from './routes/userRoute.js'
import productRouter from './routes/productRoute.js'
import cartRouter from './routes/cartRoute.js'
import orderRouter from './routes/orderRoute.js'

//App config
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()

//Middlewares //In a MERN stack (MongoDB, Express, React, Node.js), middleware functions are used in the Express.js server to handle requests, responses, and perform specific tasks before or after a request is processed by route handlers. 
app.use(express.json())
app.use(cors())

//api endpoints
app.use('/api/user', userRouter)
app.use('/api/product', productRouter)
app.use('/api/cart', cartRouter)
app.use('/api/orders', orderRouter)

app.get('/', (req,res)=>{
   res.send('Having such a good time')
})

app.listen(port, ()=> console.log('Server started on port:'+port))


//mongodb+srv://vani:Vani1234@cluster0.zz5ch.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0