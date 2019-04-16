const express = require('express');
const router = express.Router();
const User = require("../../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const auth = require("../../middleware/auth")
require('dotenv').config()
const passport = require("passport")

// POST /api/auth - Authenticate user
router.post("/", (req, res) => {
    const { username, password } = req.body;

    //Simple validation
    if (!username || !password) {
        return res.status(400).json({ msg: "Please enter all fields." });
    }

    //Check for existing user
    User.findOne({ username })
        .then(user => {
            if (!user) return res.status(400).json({ msg: "User does not exist." });
            // Validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if (!isMatch) return res.status(400).json({ msg: "Invalid credentials" })

                    jwt.sign(
                        { id: user.id },
                        process.env.JWT_SECRET,
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
                                    country: user.country,
                                }
                            })
                        }
                    )
                })
        })
})


// GET /api/auth/user - get user data
router.get("/user", auth, (req, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then(user => res.json(user))
})

/* // auth with google
router.get('/google', passport.authenticate('google', {
    scope: ['profile', "email"]
}));

// callback route for google to redirect to
// hand control to passport to use code to grab profile info
router.get('/google/callback', passport.authenticate('google'), (req, res) => {
    res.send(req.user);

    User.findOne({ email: req.user.email })
        .then(user => {
            if (user) {
                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
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
                            }
                        })
                    }
                )
            } else {
                // Send user to db
                const newUser = new User({
                    username,
                    email,
                    first_name,
                    last_name,
                    
                });
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
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


 */

// SOCIAL LOGIN

router.post("/social", (req, res) => {
    const { username, email, first_name, last_name, googleId } = req.body;

    User.findOne({ email })
        .then(user => {
            if (user) {
                const { username, password } = req.body;
                jwt.sign(
                    { id: user.id },
                    process.env.JWT_SECRET,
                    { expiresIn: 3600 },
                    (err, token) => {
                        res.json({
                            token,
                            user: {
                                id: user.id,
                                username: user.username,
                                email: user.email,
                                first_name: user.first_name,
                                last_name: user.last_name,
                                googleId: user.googleId
                            }
                        })
                    }
                )
            }
            else {
                const newUser = new User({
                    username,
                    email,
                    first_name,
                    last_name,
                    googleId
                });
                newUser.save()
                    .then(user => {
                        jwt.sign(
                            { id: user.id },
                            process.env.JWT_SECRET,
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
                                        googleId: user.googleId
                                    }
                                })
                            }
                        )
                    })
            }

        })
})

module.exports = router