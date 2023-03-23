const mongoose = require('mongoose');

const mongoURI = "mongodb://127.0.0.1:27017/EventManager";

const connectToMongo = async () => {
    try{
        await mongoose.connect(mongoURI);
        console.log("connected to mongosdb");
    }
    catch(err){
        console.log("failed to connect to mongodb",err);
    }
}

module.exports = connectToMongo;