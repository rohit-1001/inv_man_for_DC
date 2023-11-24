const jwt = require('jsonwebtoken')
const Vendor = require('../models/Vendor')


const vendorAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.inv_man.token;
        const role = req.cookies.inv_man.role;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        
        const findVendor = await Vendor.findOne({_id:verifyToken._id, "tokens.token":token})

        if(!findVendor){
            throw new Error("Login Expired")
        }

        if(role!=="vendor"){
            res.status(401).json({msg:'Unauthorized access'})
        }

        req.token=token
        req.findVendor=findVendor
        req.userID=findVendor._id
        next()
    } catch (error) {
        res.status(401).json({msg:'Unauthorized access'})
    }
}

module.exports = vendorAuthenticate