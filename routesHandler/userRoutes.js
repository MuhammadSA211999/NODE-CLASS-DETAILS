const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../schemas/userSchema')
//create mongoose instance model
const User = new mongoose.model('User', userSchema)

//SIGNUP USER
router.post('/signup', async (req, res) => {
    const { name, username, password, phone } = req.body
    try {
        //bcrypt async wayete kaj kore ebong callback e result dey; ejonno try catch blocke create kora hice
        const hased = await bcrypt.hash(password, 12)
        const newUser = new User({ name, username, phone, password: hased })
        await newUser.save()
        res.status(200).json({ message: 'created successfully' })
    }
    catch (error) {
        // console.log(error);

        res.status(500).json({ error: 'cant created' })
    }
})

//LOGIN USER WITH SECRET-TOKEN
router.post('/login', async (req, res) => {
    const { password, id } = req.body
    try {
        const user = await User.findById({ _id: id })
        console.log('user in login', user);

        if (user?._id) {
            const isMatch = await bcrypt.compare(password, user?.password)
            if (isMatch) {
                //create a token and send it to user 
                const token = jwt.sign({
                    //user info in token payload 
                    id: user?._id,
                    name: user.name,
                    uname: user.username,
                    phone: user.phone
                },
                    //secret key
                    process.env.JWT_SECRET,
                    //options
                    { expiresIn: '2h' })
                res.status(200).json({ message: 'successfully logged', token })
            }
            else {
                res.status(401).json({ error: 'Authentication failed' })
            }
        }
        else {
            res.status(401).json({ error: 'Authentication failed' })
        }
        //bcrypt async wayete kaj kore ebong callback e result dey; ejonno try catch blocke create kora hice

    }
    catch (error) {
        console.log(error);
        res.status(401).json({ error: 'authentication failed' })
    }
})

module.exports = router