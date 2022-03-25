const mongoose = require('mongoose');
const {mongoURI} = process.env;
const connectDB = async (uri = mongoURI) => {
    try{
        await mongoose.connect(uri);
        console.log("Connected to DB");
    }catch(err){
        console.log("Error in connection with database", err);
    }   
}

module.exports = connectDB;