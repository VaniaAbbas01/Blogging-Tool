const express = require("express");
const router = express.Router();
const jwt = require('jsonwebtoken')
require("dotenv").config()

router.get("/register", (req, res) => {
    res.render("register")

});

router.get("/login", (req, res) => {
    res.render("index")

});


router.post("/register", (req, res) => {
    const { username, password, email } = req.body;
    // Check if all fields are provided
    if (!username || !password || !email) {
        return res.status(400).send("All fields are required");
    }
    // Insert the new user into the database
    global.db.run("INSERT INTO users (username, password, email) VALUES (?, ?, ?)", [username, password, email], function (err) {
        if (err) {
            return res.status(500).send("Error registering user: " + err.message);
        }
        console.log("User registered successfully");
        res.redirect('/authorize/login');
    });
});

router.post("/login", (req, res, next) => {

    const { password, email, author_reader } = req.body;
    // Check if all fields are provided
    if (!password || !email || !author_reader) {
        return res.status(400).send("All fields are required");
    }
    if (author_reader.toLowerCase() === "author" || author_reader.toLowerCase() === "reader") {
        global.db.get(
            "SELECT * FROM users WHERE email = ? AND password = ?",
            [email, password],
            function (err, row) {
                if (err) {
                    return res.status(500).send("Error logging in: " + err.message);
                }
                if (!row) {
                    return res.status(400).send("Invalid login or password");
                }

                const payload = { uid: row.id, role: author_reader.toLowerCase() };
                const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: '1h' });

                console.log("User logged in successfully");

                // Send token in cookie (preferred for web apps)
                res.cookie("token", token, { httpOnly: true });

                if (author_reader.toLowerCase() === "author") {
                    res.redirect('/author/blogs');
                } else {
                    res.redirect('/readers/blogs');
                }
            }
        );
    } else {
        return res.status(400).send("Invalid role type");
    }
});



// Export the router object so index.js can access it
module.exports = router;

