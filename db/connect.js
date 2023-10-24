const mongoose = require('mongoose');

const connectDb = (mongodb_uri)=>{
    return mongoose.connect(mongodb_uri);
}

module.exports = connectDb;