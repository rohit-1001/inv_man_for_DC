const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs')
const companyAuthenticate = require('../middleware/companyAuthenticate')
const cookieParser = require('cookie-parser');
router.use(cookieParser());
const Company = require('../models/Company')
const Order = require('../models/Order')
const Vendor = require('../models/Vendor')
const Admin = require('../models/Admin')
const Dashboard = require('../models/Dashboard')
router.post('/adminlogin', async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        return res.status(400).json({ error: "Please fill all required fields" })
    }
    try {
        const emailExist = await Admin.findOne({ email: email });
        if (emailExist) {
            const isMatch = await bcrypt.compare(password, emailExist.password);
            if (isMatch) {
                token = await emailExist.generateAuthToken();
                res.cookie('inv_man', { token, role: "admin", email: email }, {
                    expires: new Date(Date.now() + 604800),
                    httpOnly: true
                })
                return res.status(200).json({ msg: "Admin login successful" })
            }
            else {
                return res.status(400).json({ error: "Admin login failed" })
            }
        }
        else {
            return res.status(400).json({ error: "Invalid credentials" })
        }
    } catch (error) {
        return res.status(500).json({ error: "Some unexpected error occured" });
    }
})

//get all companies
router.get('/allcompanies', async (req, res) => {
    try {
        // Use the Company model to find all companies in the database
        const companies = await Company.find();

        if (!companies || companies.length === 0) {
            return res.status(404).json({ error: 'No companies found' });
        }

        // Send the list of companies as a JSON response
        return res.status(200).json(companies);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});


//get all vendors
router.get('/allvendors', async (req, res) => {
    try {
        // Use the Vendor model to find all vendors in the database
        const vendors = await Vendor.find();

        if (!vendors || vendors.length === 0) {
            return res.status(404).json({ error: 'No vendors found' });
        }

        // Send the list of vendors as a JSON response
        return res.status(200).json(vendors);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal server error' });
    }
});

//get all products
router.post('/allproductsadmin', async (req, res) => {
    const { email, role } = req.body
    if (role === "vendor") {
        try {
            const vendor = await Vendor.findOne({ email: email });
            if (!vendor) {
                return res.status(400).json({ error: "Vendor not found" });
            }
            const products = vendor.products;
            if (!products) {
                return res.status(400).json({ error: "No products found" });
            }
            return res.status(200).json(products);
        }
        catch (error) {
            return res.status(500).json({ error: "Internal server error" });
        }
    }
    else if (role === "company") {
        try {
            const company = await Company.findOne({ email: email });
            if (!company) {
                return res.status(400).json({ error: "Company not found" });
            }
            const products = company.products;
            if (!products) {
                return res.status(400).json({ error: "No products found" });
            }
            return res.status(200).json(products);
        }
        catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Internal server error" });
        }
    }
});

router.get('/totaluppervalues', async (req, res) => {
    try {
        const vendors = await Vendor.find();
        const companies = await Company.find();

        const uniqueProductIds = new Set();
        let tsales = 0

        vendors.forEach((vendor) => {
            const products = vendor.products;
            products.forEach((product) => {
                uniqueProductIds.add(product.pid);
                tsales += product.sales
            });
        });
        companies.forEach((company) => {
            const products = company.products;
            products.forEach((product) => {
                uniqueProductIds.add(product.pid);
                tsales += product.sales
            });
        });

        return res.status(200).json({ tpro: uniqueProductIds.size, tsales: tsales })
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: "Internal server error" });
    }
})

// router.get('/totalsales', ())

router.post('/adminlogout', (req, res) => {
    res.clearCookie('inv_man', { path: '/' })
    return res.status(200).json({ msg: "Logged out successfully" })
})

router.get('/adminLineChart', async (req, res) => {
    const currentYear = new Date().getFullYear().toString();
    let arr = {
        "1" : 0,
        "2" : 0,
        "3" : 0,
        "4" : 0,
        "5" : 0,
        "6" : 0,
        "7" : 0,
        "8" : 0,
        "9" : 0,
        "10" : 0,
        "11" : 0,
        "12" : 0,
    }
    let arr1 = []
    try {
        const allEmails = await Dashboard.distinct('email');

        if (allEmails.length === 0) {
            return res.status(404).json({ message: 'No sale found.'});
        }
        for(const email of allEmails){
            const monthlyData = await Dashboard.findOne({
                email:email
            });
            const data = []
            for(const m of monthlyData.data){
                if(m.year===currentYear){
                    data.push(m)
                }
            }
            const months = []
            for(const d of data){
                if(d.year===currentYear){
                    months.push(d)
                }
            }
            for(const mon of months){
                let currmon = mon.month
                arr[currmon]+=mon.monthly_data.sales
            }
        }
        for(const key in arr){
            arr1.push({month:key,sales:arr[key]})
        }
        return res.status(200).json(arr1)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Some error occured"})
    }
})

module.exports = router;