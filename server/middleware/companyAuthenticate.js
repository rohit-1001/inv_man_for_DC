const jwt = require('jsonwebtoken')
const Company = require('../models/Company')


const companyAuthenticate = async (req, res, next) => {
    try {
        const token = req.cookies.inv_man.token;
        const role = req.cookies.inv_man.role;
        const verifyToken = jwt.verify(token, process.env.SECRET_KEY)
        
        const findCompany = await Company.findOne({_id:verifyToken._id, "tokens.token":token})

        if(!findCompany){
            throw new Error("Login Expired")
        }

        if(role!=="company"){
            res.status(401).json({msg:'Unauthorized access'})
        }

        req.token=token
        req.findCompany=findCompany
        req.userID=findCompany._id
        next()
    } catch (error) {
        res.status(401).json({msg:'Unauthorized access'})
    }
}

module.exports = companyAuthenticate