const express = require('express')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const router = express.Router()
const userSchema = require('../schemas/userSchema')
//create mongoose instance model
const User = new mongoose.model('User', userSchema)


router.post('/signup', async (req, res) => {
    const { name, username, password, phone } = req.body
    try {
        //bcrypt async wayete kaj kore ebong callback e result dey; ejonno try catch blocke create kora hice
        const hased = await bcrypt.hash(password, 12)
        const newUser = new User({ name, username, phone, password: hased })
        await newUser.save()
        res.status(200).json({ message: 'created successfully' })
    } catch (error) {
        // console.log(error);

        res.status(500).json({ error: 'cant created' })
    }
})

module.exports = router