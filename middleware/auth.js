const jwt = require('jsonwebtoken')
const userModel = require('../models/userModel')
const SecretKey = " hellonodejsfamilythisisoursleeptrackapplication"
const auth = (req, res, next) => {
    // console.log(req.body);

    try {

        let token = req.headers.authorization

        if (token) {
            token = token.split(" ")[1]
            let user = jwt.verify(token, SecretKey)
            req.userId = user.id
            // console.log("🚀 ~ file: auth.js:14 ~ auth ~  user.id", user.id)

        }
        else {
            res.status(401).json({ message: " Unauthorized User " })
        }

        next()


    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Unauthorized User" })

    }



}

module.exports = auth;