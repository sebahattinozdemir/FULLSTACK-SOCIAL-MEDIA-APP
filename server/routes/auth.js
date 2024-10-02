const auth = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");

// REGISTER
auth.post("/register", async (req, res) => {

    try {

        // create new password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);

        // create new user
        const user = await new User({
            username: req.body.username,
            password: hashedPassword,
            email: req.body.email
        })

        // save user return response
        await user.save();
        res.status(201).json({message: "USER SUCCESSFULLY CREATED"})
    } catch (e) {
        res.status(500).json({message: e.message})
    }

})

// LOGIN
auth.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email});
        !user && res.status(404).json({message: "USER NOT FOUND"})

        const validPassword = await bcrypt.compare(req.body.password, user.password);
        !validPassword && res.status(400).json({message: "WRONG PASSWORD"})

        res.status(200).json({message: "LOGIN SUCCESSFULLY"})
    } catch (e) {
        console.log(e)
        res.status(500).json({message: e.message})
    }

})

module.exports = auth;