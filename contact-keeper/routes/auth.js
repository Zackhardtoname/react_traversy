const express = require("express")
const router = express.Router();
const bcrypt = require('bcryptjs')
const jwt = require("jsonwebtoken")
const config = require("config")
const {check, validationResult} = require('express-validator/check')
const User = require("../models/User")
const auth = require("../middleware/auth")

// @ route    GET api/auth
// @desc      Get logged in user
// @access    Private
//to make it private, just pass the middleware as the second param
router.get("/", auth, async (req, res) => {
    try {
        // not sending the password even though it is encrypted
        const user = await User.findById(req.user.id).select("-password")
        res.json(user)
    }
    catch (err) {
        console.error(err.message)
        res.status(500).send("Server Error")
    }
});

// @ route    POST api/auth
// @desc      Auth user & get token
// @access    Public
router.post("/", [
    check("email", "Please include a valid email").isEmail(),
    check("password", "Password is required").exists(),

], async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }

    const {email, password} = req.body
    try {
        let user = await User.findOne({email: email})

        if (!user) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch) {
            return res.status(400).json({msg: "Invalid credentials"});
        }

        const payload = {
            user: {
                id: user.id
            }
        }

        jwt.sign(payload, config.get("jwtSecret"), {
            expiresIn: 7200
        }, (err, token) => {
            if (err) throw err;
            res.json({token})
        })
    } catch (err) {
        console.error(err.message)
        res.status(500).send("Sever Error")
    }
});

module.exports = router;
