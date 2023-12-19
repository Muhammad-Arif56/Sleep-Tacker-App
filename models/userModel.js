const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: [true, " Please enter username"],
        unique: true
    },

    email: {
        type: String,
        require: [true, "Please enter email"],
        unique: true
    },

    password: {
        type: String,
        require: [true, " Please enter password"]
    },
    profile: {
        type: String
    }


},
    { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)