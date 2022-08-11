const mongoose = require('mongoose');



const connectDB = async () => {
    try {
        await mongoose.connect('mongodb+srv://loidaiminh:phuan@cluster0.7gci9.mongodb.net/myFirstDatabase?retryWrites=true&w=majority');

        console.log('MongoDB connected...')
    } catch (error) {
        console.log(errer);
        // exit process with failure
        process.exit(1)
    }
}


module.exports = connectDB;