const mongoose = require("mongoose");

const connectDatabase = async () => {
    try{
        let data = await mongoose.connect(process.env.DB_URL, {});
        console.log(`MongoDB connected to the server: ${data.connection.host}`);
    }
    catch(err){
        console.log("[Databse Connection error]", err.message)
    }
}

module.exports = connectDatabase