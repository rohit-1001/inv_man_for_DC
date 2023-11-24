const express = require('express');
const router = express.Router();
const User = require('../models/User')
const ContactForm = require('../models/Contact')
const bcrypt = require('bcryptjs')
const authenticate = require('../middleware/authenticate')
const authenticateContact = require('../middleware/authenticateContact')
const cookieParser = require('cookie-parser');
router.use(cookieParser());

router.post('/register', async (req, res) => {
    const {name, email, phone, password, confirmPassword} = req.body;

    if(!name || !email || !phone || !password || !confirmPassword){
        res.status(422).json({msg: "All fields need to be filled"});
    }
    
    try {
        const userExist = await User.findOne({email: email});
        if(userExist){
            res.status(409).json({msg: "Email already registered"});
        }
        else if(password!=confirmPassword){
            res.status(422).json({msg: "Passwords do not match"});
        }
        const user = new User({name, email, phone, password, confirmPassword});
        await user.save();
        res.status(200).json({msg: "User registered successfully"});
    } catch (error) {
        res.status(500).json({msg: "Some unexpected error occured"});
    }
})

router.post('/signin', async (req, res) => {
    const {email, password} = req.body;
    if(!email || !password){
        res.status(400).json({msg: "Please fill all required fields"})
    }
    try {
        const emailExist = await User.findOne({email: email});
        if(emailExist){
            const isMatch = await bcrypt.compare(password, emailExist.password);
            if(isMatch){
                token = await emailExist.generateAuthToken();
                res.cookie('libcoo', token, {
                    expires: new Date(Date.now() + 604800),
                    httpOnly: true
                })
                res.status(200).json({msg: "User login successful"})
            }
            else{
                res.status(400).json({msg: "User login failed"})
            }
        }
        else{
            res.status(400).json({msg: "Invalid credentials"})
        }
    } catch (error) {
        res.status(500).json({msg: "Some unexpected error occured"});
    }
})

router.get('/aboutpage', authenticate, (req, res) => {
    res.status(200).send(req.findUser)
})

router.get('/getcontact', authenticateContact, (req, res) => {
    res.status(200).send(req.findUser)
})

router.post('/contactform', async (req, res) => {
    try {
        const {name, email, phone, msg} = req.body;

        if(!name || !email || !phone || !msg){
            res.status(400).json({msg:"Please fill the required fields"})
        }

        const contact = new ContactForm({name, email, phone, msg})
        await contact.save()

        res.status(200).json({msg:"Contact form submitted successfully"})
    } catch (error) {
        res.status(500).json({msg:"Some unexpected error occured"})
    }
})

router.post('/userlogout', (req, res) => {
    console.log('userlogout function 1')
    res.clearCookie('libcoo', {path:'/'})
    console.log('userlogout function 2')
    res.status(200).json({msg:"User logged out successfully"})
})

module.exports = router;