const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const userModel = require('../models/userModel')
const SecretKey = " hellonodejsfamilythisisoursleeptrackapplication"

const multer = require('multer')

//upload file
const storage = multer.diskStorage({
    destination: (req, fil, cb) => {
        cb(null, "C:/Users/Cyber  World/Desktop/Sleep_Tracker_App/project/images")
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix + '-' + file.originalname)
    }
})

const upload = multer({ storage: storage })


//signup user
const signup = async (req, res) => {
    const { username, email, password } = req.body
    console.log("🚀 ~ file: userController.js:25 ~ signup ~  req.body", req.body)


    if (!username || !email || !password || !req.file) {
        return res.status(400).send("Please enter all data ")
    }
    try {
        const existingUser = await userModel.findOne({ email: email })
        if (existingUser) {
            return res.status(400).json({ message: " User Already Exists " })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const newUser = await userModel.create({
            username: username,
            email: email,
            password: hashedPassword,
            profile: req.file.path

        })
        console.log("Successfully Signed-Up ");

        const token = jwt.sign({ email: newUser.email, id: newUser._id }, SecretKey)
        return res.status(201).json({ user: newUser, token: token })

    } catch (error) {
        console.log(error);
        return res.status(500).send("Something went wrong ")

    }

}


//login 


const signin = async (req, res) => {
    console.log(req.body)
    const { email, password } = req.body

    try {
        const existingUser = await userModel.findOne({ email: email })
        if (!existingUser) {
            return res.status(404).json("User not found")
        }
        const matchPassword = await bcrypt.compare(password, existingUser.password)
        if (!matchPassword) {
            return res.status(400).json({ Message: "Invalid data" })
        }

        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, SecretKey)
        res.status(201).json({ user: existingUser, token: token })
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" })
    }

}

// get all users

const getUsers = async (req, res) => {
    try {
        const users = await userModel.find({ userId: req.userId })
        res.status(200).json(users)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Something Went Wrong" })
    }

}



// Delete user 

const deleteUser = async (req, res) => {
    const id = req.params.id
    try {
        const deleteUser = await userModel.findByIdAndDelete(id, { new: true })
        console.log("working");
        res.status(202).json(deleteUser)
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: " Something went wrong" })
    }

}


module.exports = { signup, signin, getUsers, deleteUser, upload }

