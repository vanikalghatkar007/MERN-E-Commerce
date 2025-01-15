import jwt from 'jsonwebtoken';

const adminAuth = async (req, res, next) => {
    try {
        const {token}  = req.headers;

        //check if authorized
        if (!token) {
            return res.status(401).json({success: false, message:"Not authorized login again"})
        }

        //decode token to get email&pwd
        const token_decode = jwt.verify(token, process.env.JWT_SECRET)
        if(token_decode !== process.env.ADMIN_EMAIL.concat(process.env.ADMIN_PASSWORD)){
            return res.status(401).json({success: false, message:"Not authorized login again"})
        }

        next()

    } catch (error) {
        console.log(error);
        res.status(500).json({success:false, message:error.message})
    }
}

export default adminAuth