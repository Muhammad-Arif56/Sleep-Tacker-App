const mongoose = require('mongoose')

const sleepSchema = mongoose.Schema({
    sleepTime: {
        type: Date
    },
    wakeUpTime: {
        type: Date
    },

    startDate: {
        type: Date
    },
    endDate: {
        type: Date
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User"
    }

}, { timestamps: true })

module.exports = mongoose.model("Sleep", sleepSchema)