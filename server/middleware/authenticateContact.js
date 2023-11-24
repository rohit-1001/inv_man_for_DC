const jwt = require('jsonwebtoken')
const User = require('../models/User')


const AuthenticateContact = async (req, res, next) => {
    try {
        const token = req.cookies.libcoo;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        
        const findUser = await User.findOne({_id:verifyToken._id, "tokens.token":token})

        req.token=token
        req.findUser=findUser
        req.userID=findUser._id
        next()
    } catch (error) {
        res.send('No user signed in')
    }
}

module.exports = AuthenticateContact