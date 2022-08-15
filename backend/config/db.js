const mongoose = require('mongoose');
const dotenv = require("dotenv")

dotenv.config()


const connectDB = async () => {
    try {
        await mongoose.connect(process.env.DATABASE);

        console.log('MongoDB connected...')
    } catch (error) {
        console.log(errer);
        // exit process with failure
        process.exit(1)
    }
}


module.exports = connectDB;