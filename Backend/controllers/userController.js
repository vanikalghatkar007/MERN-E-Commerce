import userModel from '../models/userModel.js'
import validator from 'validator'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import e from 'cors'

const createToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET)
}

// Route for user login
const loginUser = async(req, res) => {
    try {
        const {email, password} = req.body;

        const user = await userModel.findOne({email});
        if(!user){
            return res.json({success:false, message:"User does not exist"})
        }

        const isMatch =  await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            return res.status(200).json({success:true, token})
        }
        else{
            return res.json({success:false, message: "Invalid credentials"})
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error.message})
    }
}


// Route for user register
const registerUser = async(req, res) => {
    try {
        const {name, email, password} = req.body;

        //checking if user already exists
        const exists = await userModel.findOne({email})
        if(exists){
            return res.json({success: false, message: "User already exists"})
        } 

        //validating email & pwd
        if (!validator.isEmail(email)) {
            return res.json({success: false, message: "Please enter a valid email"})
        }
        if (password.length < 8) {
            return res.json({success: false, message: "Please enter a strong password"})
        }

        //hashing user password
        const salt = await bcrypt.genSalt(8)
        const hashedPassword = await bcrypt.hash(password, salt);
        
        //create user
        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        //save user in db
        const user = await newUser.save();

        //token generation
        const token = createToken(user._id)

        //send the token in response
        return res.status(201).json({success:true, token})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error.message})
    }
}


// Route for user register
const loginAdmin= async(req, res) => {
    try {
        const {email, password} = req.body;

        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

            //Create jwt token
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            return res.status(201).json({success:true, token})
        } else{
            return res.status(401).json({success:false, message:'Invalid credentials' })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error.message})
    }
}

export {loginUser, registerUser, loginAdmin}