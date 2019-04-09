const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken")

// POST /api/users - Register new user
router.post("/", (req, res) => {
    const { username, email, password, first_name, last_name, country } = req.body;

    //Simple validation
    if (!username || !email || !password || !first_name || !last_name || !country) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    //Check for existing user
    User.findOne({ email })
        .then(user => {
            if (user) return res.status(400).json({ msg: "User already exists." });

            const newUser = new User({
                username,
                email,
                password, 
                first_name, 
                last_name, 
                country
            });

            // Create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if (err) throw err;
                    newUser.password = hash;
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user.id },
                                config.get("jwtSecret"),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if (err) throw err;
                                    res.json({
                                        token,
                                        user: {
                                            id: user.id,
                                            username: user.username,
                                            email: user.email,
                                            first_name: user.first_name,
                                            last_name: user.last_name,
                                            country: user.country
                                        }
                                    })
                                }
                            )
                        })
                })
            })
        })
})

module.exports = router