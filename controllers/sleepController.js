const sleepModel = require("../models/sleepModel")
//Sleep Crud Methods...
//create api
const createSleepEntry = async (req, res) => {
    // console.log(req.body)
    const { sleepTime, wakeUpTime, user } = req.body
    try {
        const newSleep = await sleepModel.create({
            sleepTime: sleepTime,
            wakeUpTime: wakeUpTime,
            user: req.userId

        })

        // console.log(newSleep)
        return res.status(201).json(newSleep)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something Went Wrong" })
    }

}

//get all sleepTime

const getAllSleepTime = async (req, res) => {
    try {
        const allSleeps = await sleepModel.find({ user: req.userId })
        return res.status(201).json(allSleeps)
    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}
// Update api
const updateSleepEntry = async (req, res) => {

    const id = req.params.id
    const { sleepTime, wakeUpTime } = req.body


    try {
        const sleepTimeExist = sleepModel.find({ sleepTime: sleepTime })
        if (!sleepTimeExist) {
            return res.json({ message: "Please, set your sleep time first" })
        }
        const update = await sleepModel.findByIdAndUpdate(id, {
            sleepTime: sleepTime,
            wakeUpTime: wakeUpTime
        },
            { new: true })
        return res.status(200).json(update)

    } catch (error) {
        console.log(error);
        return res.status(400).json({ message: "Something Went Wrong" })
    }
}
//delete api
const deleteSleepEntry = async (req, res) => {
    const id = req.params.id
    try {
        const deleteSleep = await sleepModel.findByIdAndDelete(id)
        return res.status(202).json(deleteSleep)
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: " Something went wrong" })
    }
}



//----------------------------------------------------------------------

// take two input from user (startDate,endDate)
// fetch all record  between two dates
// 1 calculate daily sleep time
// 2 calculate sleep time average
//  return daily base total sleep time per day
// { 
//     dailySleepTime: [{
//     day: "monday",
//     time: "6 hours"
// }],
// overAllSleepAverage: "5 hours"
// }




//-->
//sleepTimeBetweenTwoDates

const sleepTimeBetweenTwoDates = async (req, res) => {

    const { startDate, endDate } = req.body
    console.log(new Date(startDate));
    console.log("🚀 ~ file: sleepController.js:95 ~ sleepTimeBetweenTwoDates ~ req.body", req.body)
    try {
        const existingDate = await sleepModel.find({
            $and: [
                { sleepTime: { "$gte": new Date(startDate) } },
                { wakeUpTime: { "$lte": new Date(endDate) } }
            ]
        }).exec()
        console.log("🚀 ~ file: sleepController.js:106 ~ sleepTimeBetweenTwoDates ~ existingDate", existingDate)
        // res.status(200).json(existingDate)
        if (!existingDate.length) {
            return res.status(401).json({ attention: "sleeptime not found on this date" })
        }

        // calculate sleepTime average in hours between two dates

        const avg = ((existingDate.reduce((acc, curr) => {
            const sleep = new Date(curr.sleepTime);
            const wakeUp = new Date(curr.wakeUpTime);
            const diff = wakeUp.getTime() - sleep.getTime()
            return acc + diff

        }, 0)) / existingDate.length) / (1000 * 60 * 60)

        return res.status(201).json(avg)
    } catch (error) {
        return res.send('errorsss :  ' + error)
    }
}

//calculate sleep time of single day

const signleDaySleepTime = async (req, res) => {
    const { startDate, endDate } = req.body
    try {
        const existingDate = await sleepModel.find({
            $and: [
                { sleepTime: { "$gte": new Date(startDate) } },
                { wakeUpTime: { "$lte": new Date(endDate) } }
            ]
        }).exec()

        if (!existingDate) {
            res.json({ message: "date not found" })
        }

        const sleepTimeDay = (existingDate.filter((curr) => {

            const sleep = new Date(curr.sleepTime)
            const wakeUp = new Date(curr.wakeUpTime);
            const diff = wakeUp.getTime() - sleep.getTime()
            return diff
        })) / (1000 * 60 * 60)
        console.log("🚀 ~ file: sleepController.js:151 ~ sleepTimeDay ~ sleepTimeDay", sleepTimeDay)
        // const day = new Date(curr.wakeUpTime).getDay()
        // console.log(day);
        // console.log("🚀 ~ file: sleepController.js:123 ~ signleDaySleepTime ~ diff", TimeHours + " milliseconds")
        return res.status(201).json({ sleepTimeDay })
    } catch (error) {
        return res.send('eroor :  ' + error)
    }

}



module.exports = { createSleepEntry, getAllSleepTime, updateSleepEntry, deleteSleepEntry, sleepTimeBetweenTwoDates, signleDaySleepTime }



