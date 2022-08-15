const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/user');


router.get('/',auth,async (req,res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user)
    } catch (error) {
        res.status(500).send('Serve Error')
    }
});


module.exports = router;
