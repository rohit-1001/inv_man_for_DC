const jwt = require('jsonwebtoken')
const User = require('../models/User')


const Authenticate = async (req, res, next) => {
    try {
        const token = req.cookies.inv_man;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        
        const findUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})

        if(!findUser){
            throw new Error("Login Expired")
        }

        req.token=token
        req.findUser=findUser
        req.userID=findUser._id
        next()
    } catch (error) {
        res.status(401).json({msg:'Unauthorized access'})
    }
}

module.exports = Authenticate