const express = require('express');
const router = express.Router();
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {check,validationResult} = require('express-validator');

const dotenv = require("dotenv")

dotenv.config()

// @route Get api/auth

router.post('/',[
    check('email','Please include a valid email').isEmail(),
    check(
        'password',
        'password is required'
    ).exists()
],async (req,res) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({
            error: errors.array()
        });
    }
    
    const {email,password} = req.body;

    try {
        // See if user exists
        let user = await User.findOne({email});
        if(!user){
            return res.status(400).json({
                errors: [{msg: 'This user is not exist!'}]
            })
        }

        const isMatch = await bcrypt.compare(password,user.password);

        if(!isMatch){
            return res
                .status(400)
                .json({errors: [{msg: 'This user is not exist!'}]});
        }
        
          // Encrypt password
        const payload = {
            user: {
                id: user.id
            }
        }
        jwt.sign(
            payload, 
            process.env.SECRET_KEY,
        { expiresIn : 3600},
        (err,token) => {
            if(err) throw err;
            res.json({
                token: token,
                user: user
            })
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Server error')
    }
});

module.exports = router;

