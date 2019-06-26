const mongoose = require("mongoose")
const config = require("config")
//config allows you to get values inside proj_root/config/default.json
const db = config.get("mongoURI")

const connectDB = async () => {
    try {
        await mongoose.connect(db, {
            useNewUrlParser: true,
            useCreateIndex: true,
            useFindAndModify: false
        })
        console.log("MongoDB connected")
    } catch (err) {
        console.error(err.message)
        process.exit(1)
    }
}

module.exports = connectDB;